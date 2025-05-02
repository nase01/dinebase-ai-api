import { Request, Response } from 'express';
import queryValidate from '../utils/validations';
import getQueryPrompt from '../utils/prompts';
import { generateSessionToken } from '../utils/keygen';
import axios from 'axios';


const fqrBaseURL = 'https://api.foursquare.com/v3';
const openaiBaseURL = 'https://api.openai.com/v1';

export const execute = async (req: Request, res: Response): Promise<any> => {
  try {
    const validate = queryValidate(req.body);
    
    if (validate !== true) {
      return res.status(400).json({ errors: [{ status: '400', detail: validate.error }] });
    }

    const message = req.body.message;
    const prompt = getQueryPrompt(message);

    // OpenAI API Request
    const openaiRes = await axios.post(`${openaiBaseURL}/chat/completions`, {
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: 'You output only valid JSON commands for a restaurant search API.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0
    },{
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const jsonCommand = JSON.parse(openaiRes.data.choices[0].message.content);
    if (jsonCommand.action !== 'restaurant_search') {
      return res.status(200).json({ data: [] });
    } 

    // Foursquare API Request
    const listOfPlaces = await axios.get(`${fqrBaseURL}/places/search`, {
      headers: {
        Authorization: `${process.env.FOURSQUARE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: jsonCommand.parameters
    });

    const places = listOfPlaces.data.results.map((place: any) => ({
      id: place.fsq_id,
    }));

    const ids = places.map((place: { id: string }) => place.id);
    const ressults = await Promise.all(ids.map(fetchPlaceDetails));
    const detailedPlaces = ressults.filter(data => data !== null);
    
    const finalData = formatPlaceData(detailedPlaces);

    return res.status(200).json({data: finalData });
  } catch (error) {
    return res.status(500).json({ errors: [{ status: '500', detail: 'Internal Server Error' }] });
  }
};

const fetchPlaceDetails = async (id: string) => {
  try {
    const sessionToken = generateSessionToken();

    const res = await axios.get(`${fqrBaseURL}/places/${id}`, {
      headers: {
        Authorization: `${process.env.FOURSQUARE_API_KEY}`,
        accept: 'application/json',
      },
      params: {
        fields: 'name,categories,price,location,rating,stats,hours,link,photos',
        session_token: `${sessionToken}`,
      },
    });

    return res.data;

  } catch (error) {
    console.error(`Failed to fetch ${id}:`, error);
    return null; // Or handle however you'd like
  }
};

const formatPlaceData = (data: any[]) => {
  return data.map(place => ({
    name: place.name,
    address: place.location?.formatted_address || '',
    cuisine: place.categories?.[0]?.short_name || '',
    rating: place.rating || null,
    priceLevel: place.price || null,
    operatingHours: place.hours?.display || '',
  }));
};
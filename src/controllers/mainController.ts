import { Request, Response } from 'express';
import axios from 'axios';

export const ping = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.github.com');
    return res.status(200).json({ message: 'pong', github: response.data })
  } catch (error) {
    return res.status(500).json({ errors: [{ status: '500', detail: 'Internal Server Error' }] })
  }
};
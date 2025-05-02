# DineBaseAI - API

Simple backend API service that uses AI to parametized user's query and use it to request filtered search on Foursquare "Search Places API"  

Requirements:
- Node 20+
- Foursquare API keys https://foursquare.com/developers
- OpenAI API keys https://platform.openai.com

Tech Stack:
- Expresss
- Axios
- Typescript

How to run on your localhost:
- copy or clone this repository
- create .env and copy .env.example values
- run npm install
- run npm run dev
- run using http://localhost:9000

Deployed Version Base URL:
- https://dinebase-ai-api.vercel.app

API Endpoint:
curl --location 'https://dinebase-ai-api.vercel.app/api/execute' \
--header 'Content-Type: application/json' \
--data '{
  "message": "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating."
}
'

Demo App Client:
- https://dinebase-ai.vercel.app


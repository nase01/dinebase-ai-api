import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import express from 'express';
import mainRoutes from '../src/routes/mainRoutes';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// routes entry point
app.use('/api', mainRoutes);

// Local Deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 9000;
  app.listen(PORT)

  console.log(`Listening to port ${PORT}`)
}

// Vercel Deployment
const server = createServer(app);
export default function handler(req: VercelRequest, res: VercelResponse) {
  return server.emit('request', req as unknown as IncomingMessage, res as unknown as ServerResponse);
}
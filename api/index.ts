import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import mainRoutes from '../src/routes/mainRoutes';

const app = express();
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
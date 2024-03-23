// Import modules
import express from 'express';
import cors from 'cors';
import { wordRouter } from './routes/words.route';
import routes from './config/routes';
import { privateRouter } from './routes/private.route';
import { notFound } from './middlewares/notFound';
import { sentenceRouter } from './routes/sentences.route';

// Create and Express application
const app = express();

// Set up middleware functions
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routing app
app.use(routes.words, wordRouter);
app.use(routes.sentences, sentenceRouter);
app.use(routes.private, privateRouter);

// Set up 404 error handler
app.use(notFound)

// Export the express application
export default app;
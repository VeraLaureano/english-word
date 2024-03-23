import { connect, set } from 'mongoose';
import { logError, logInfo } from '../utils/loggers';

// Set strict mode in querys
set('strictQuery', true);

// Define a function to connect to a mongodb database
const connectDB: (a: string) => void = (url: string) => {
  // Call the connect function with the URL
  connect(url)
    .then(() => logInfo('Connected to the DB...'))
    .catch((err) => logError(err));
};

// Export the connectDB function
export default connectDB;
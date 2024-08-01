const mongoose = require('mongoose');

const getMongoURI = () => {
    const { NODE_ENV } = process.env;
    
    
    if (NODE_ENV === 'development') {
      return 'mongodb://127.0.0.1:27017/myLocalDB';
    }
  
    
    if (NODE_ENV === 'production') {
      const user = process.env.DB_USER;
      const password = process.env.DB_PASSWORD;
      const dbName = process.env.DB_NAME;
      const cluster = process.env.DB_CLUSTER;
  
      if (!user || !password || !dbName || !cluster) {
        throw new Error('Missing required environment variables for MongoDB connection');
      }
  
      return `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    }
  
    
    throw new Error('Invalid NODE_ENV value. Expected "development" or "production".');
  };

// Function to connect to MongoDB
const connectDB = async () => {
    console.log("attempting to connect database ...")
  const mongoURI = getMongoURI();

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }

  
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing MongoDB connection');
    await mongoose.connection.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing MongoDB connection');
    await mongoose.connection.close();
    process.exit(0);
  });
};

module.exports = connectDB;

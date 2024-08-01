
// declarations

const startupTime = new Date();
const cors = require('cors');
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const user = require("./router/user");
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const connectDB = require('./database/connect');


// declarations


// methods
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "http://localhost:3000"],
      styleSrc: ["'self'", "http://localhost:3000"]
    }
  },
  frameguard: {
    action: 'deny'
  },
  hsts: {
    maxAge: 31536000, 
    includeSubDomains: true
  }
}));

connectDB()
//methods

//routes

app.use("/", user);

//routes




// helpers


app.listen(process.env.PORT || 3000 , () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`------------------------------------------`);
  
    console.log(`Current environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Listening on port: ${process.env.PORT}`);
    console.log(`URL: http://localhost:${process.env.PORT}`);
    console.log(`Startup Time: ${startupTime}`);
   
    console.log(`------------------------------------------`);
  }
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); 
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', promise, 'reason:', reason);
  process.exit(1); 
});
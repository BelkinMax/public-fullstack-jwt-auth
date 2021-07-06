require('dotenv').config();

const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const router = require('./router');

const { DB_USERNAME, DB_PASSWORD, DB_NAME, PORT = 5000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.1y6xw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

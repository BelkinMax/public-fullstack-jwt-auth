require('dotenv').config();

const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1y6xw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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

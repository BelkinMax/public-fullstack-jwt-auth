require('dotenv').config();

const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

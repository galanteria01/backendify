const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);

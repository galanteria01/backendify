const express = require('express');
const dotenv = require('dotenv');
const app = express();
const authRouter = require('./routes/auth');
const streamRouter = require('./routes/stream');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/stream', streamRouter)

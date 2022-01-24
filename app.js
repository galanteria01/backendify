import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import authRouter from './routes/auth.js';
import streamRouter from './routes/stream.js';
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
const app = express();
const server = createServer(app);
const io = new Server(server);
config();

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

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/stream', streamRouter)

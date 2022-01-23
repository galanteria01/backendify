const express = require('express');
const { playVideo, playAudio } = require('../controllers/streamController');
const router = express.Router();

app.get("/video", playVideo);
app.get("/audio", playAudio);

module.exports = router;

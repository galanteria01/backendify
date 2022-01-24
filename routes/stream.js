import { Router } from 'express';
import { playVideo, playAudio } from '../controllers/streamController.js';
const router = Router();

router.get("/video", playVideo);
router.get("/audio", playAudio);

export default router;

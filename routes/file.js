import { download, upload } from '../controllers/fileController';
const { Router } = require('express');
const router = Router();

router.post('/download', download);
router.post('/upload', upload);

export default router;
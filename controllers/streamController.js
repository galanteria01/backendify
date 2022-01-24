import { statSync, createReadStream } from 'fs';

const playVideo = async (req, res) => {

  const range = req.headers.range;
  if (!range) {
    return res.status(400).send('Missing Range header');
  }

  const videoPath = path.join(__dirname, '../assets/videos/test.mp4');
  const stat = statSync(videoPath);

  const CHUNK_SIZE = 10 ** 6;
  const total = stat.size;
  const start = Number(range.replace(/\D/g, ""));;
  const end = Math.min(start + CHUNK_SIZE, total - 1);

  const length = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${total}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': length,
    'Content-Type': 'video/mp4'
  }

  res.writeHead(206, headers);
  const stream = createReadStream(videoPath, { start, end });
  stream.pipe(res);

}

const playAudio = async (req, res) => {

  const range = req.headers.range;
  if (!range) {
    return res.status(400).send('Missing Range header');
  }

  const audioPath = path.join(__dirname, '../assets/audios/test.mp3');
  const stat = statSync(audioPath);

  const CHUNK_SIZE = 10 ** 6;
  const total = stat.size;
  const start = Number(range.replace(/\D/g, ""));;
  const end = Math.min(start + CHUNK_SIZE, total - 1);

  const length = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${total}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': length,
    'Content-Type': 'audio/mp3'
  }

  res.writeHead(206, headers);
  const stream = createReadStream(audioPath, { start, end });
  stream.pipe(res);

}

export {
  playVideo,
  playAudio
}
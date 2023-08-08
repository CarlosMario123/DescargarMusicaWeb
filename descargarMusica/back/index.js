const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cors = require('cors'); // Para manejar los CORS

const app = express();
app.use(cors());

app.get('/descargar-musica', (req, res) => {
  const videoUrl = req.query.url; // Obtener la URL del video desde el frontend
  const downloadDir = './audios/';

  descargarMusica(videoUrl, downloadDir)
    .then((rutaAudio) => {
      res.download(rutaAudio, 'audio.mp3'); // Enviar el archivo descargado al frontend
    })
    .catch((error) => {
      console.error('Error al descargar la música:', error);
      res.status(500).send('Error al descargar la música.');
    });
});

function descargarMusica(videoUrl, directorio) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(directorio)) {
      fs.mkdirSync(directorio);
    }

    const outputFilePath = `${directorio}audio.mp3`;

    const stream = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' });
    const writeStream = fs.createWriteStream(outputFilePath);

    stream.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('Descarga de audio completada.');
      resolve(outputFilePath);
    });

    writeStream.on('error', (error) => {
      console.error('Error al descargar el audio:', error);
      reject(error);
    });
  });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`);
});

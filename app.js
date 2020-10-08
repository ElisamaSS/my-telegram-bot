import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';

dotenv.config();
//O método cria um caminho absoluto da direita para a esquerda até que um caminho absoluto seja construído.
path.__dirname = path.resolve();

const app = express();
const httpServer = http.createServer(app);

app.use(express.static('public'));

httpServer.listen(8080, function () {
  console.log('Conectado 8080');
});

app.get('/', (req, res) => {
  res.sendFile(path.__dirname + '/index.html');
  console.log('Carregando Index....');
});

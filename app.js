const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

app.use(express.static('public'));

http.listen(3000, function () {
  console.log('Conectado 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log('Carregando Index....');
});

// Substitua o valor abaixo pelo token de telegrama que você recebe de @BotFather
const token = '1297260365:AAGmjpv-tz1TvqvaPTGZi-byRU_xtR6iqaw';

// Crie um bot que usa 'polling' para buscar novas atualizações
const bot = new TelegramBot(token, { polling: true });

//Ouça qualquer tipo de mensagem. Existem diferentes tipos de mensagens.
bot.on('message', (msg) => {
  // chat.innerHTML = '<div class="info">You are connected to the chat</div>';

  const start = new Date();
  console.log('Data: ', start.toLocaleString());
  //console.log('AQUI', msg);
  const chatId = msg.chat.id;
  const newuser = msg.chat.first_name;
  const newmsg = msg.text;
  console.log('Usuário: ', newuser);
  console.log('Mensagem Recebida: ', newmsg);

  // enviar uma mensagem para o chat acusando o recebimento da mensagem
  bot.sendMessage(chatId, 'Olá, como posso lhe ajudar?');
  console.log('ID do Usuário:', chatId);
});

//Obter mensagem editada
bot.on('edited_message', (msg) => {
  const start = new Date();
  console.log('Data: ', start.toLocaleString());
  const chatId = msg.chat.id;
  const newmsgedit = msg.text;
  console.log('Mensagem Editada:', newmsgedit);
  console.log('ID:', chatId);
  bot.sendMessage(
    chatId,
    'Atenção! Ao editar a mensagem esta alteração não é replicada ao operador, por favor envie uma nova mensagem!'
  );
});

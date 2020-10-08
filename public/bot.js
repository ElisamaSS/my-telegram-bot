const TelegramBot = require('node-telegram-bot-api');

// Substitua o valor abaixo pelo token de telegrama que você recebe de @BotFather
const token = '1297260365:AAGyRh6OFFhSoc2h2ioeeOyy7cjXd1xPEw8';

// Crie um bot que usa 'polling' para buscar novas atualizações
const bot = new TelegramBot(token, { polling: true });

var allText = [];

bot.on('polling_error', (err) => console.log(err));

//Ouça qualquer tipo de mensagem. Existem diferentes tipos de mensagens.
bot.on('message', (msg) => {
  const msgReceived = document.querySelector('#messages');
  console.log(msgReceived);
  let start = new Date();
  date = start.toLocaleString();
  console.log('Data: ', date);
  console.log('Return', msg);
  chatId = msg.chat.id;
  const newuser = msg.chat.first_name;
  let newmsg = msg.text;
  console.log('Usuário: ', newuser);
  console.log('Mensagem Recebida: ', newmsg);

  //textContent = Define ou recupera o conteúdo de texto de um nó e qualquer nó filho.
  msgReceived.textContent = newmsg;

  var addMsg = allText.push(newmsg, date);
  console.log(addMsg);

  const tableElement = document.querySelector('.data-table') || {};
  let userData = `<div class="card w-50">
                      <div class="card-body">
                        <h5 class="card-title">${newuser}</h5>
                        <a href="#" class="btn btn-warning">Responder</a>`;

  allText.forEach((element) => {
    userData += `<p class="card-text">${element}</p>`;
  });

  `
                      </div>
                  </div>`;

  tableElement.innerHTML = userData;

  /* DOWNLOAD DE ARQUIVOS
    Para download dos arquivos é necessário obter o file_id
    https://api.telegram.org/bot1297260365:AAGyRh6OFFhSoc2h2ioeeOyy7cjXd1xPEw8/getFile?file_id=
    Para download: https://api.telegram.org/file/bot1297260365:AAGyRh6OFFhSoc2h2ioeeOyy7cjXd1xPEw8/<file_path>
  */
  let myphoto = msg.photo;
  console.log('Foto', myphoto);

  let myvoice = msg.voice;
  console.log('Voz', myvoice);

  let myvideo = msg.video;
  console.log('Video', myvideo);

  let mydocument = msg.document;
  console.log('Documento', mydocument);
});

function responseMsg() {
  var text = document.getElementById('sendMsg').value;
  bot.sendMessage(chatId, text);

  console.log('Resposta:', text);
  console.log('id:', chatId);

  document.getElementById('sendMsg').value = '';
}
//https://www.geeksforgeeks.org/node-js-bot-sendphoto-method/
// function uploadFile() {
//   var photo = document.getElementById('send-upload-photo').value;
//
//   bot.sendPhoto(chatId, photo);
// }

/* UPLOAD DE ARQUIVOS
Gerador de Imagens - https://random.dog/woof.json
https://www.youtube.com/watch?v=myW0tWBFMNo (IMPORTANTE)
Ex: https://api.telegram.org/bot{Token}/sendphoto?chat_id={chatI}d&photo={file_id}
ENVIAR FOTO
https://api.telegram.org/bot1297260365:AAGyRh6OFFhSoc2h2ioeeOyy7cjXd1xPEw8/sendphoto?chat_id=1192657655&photo=https://random.dog/e3cc388e-5bff-488d-9202-67c360680422.JPG

ENVIAR DOCUMENTO
https://api.telegram.org/bot1297260365:AAGyRh6OFFhSoc2h2ioeeOyy7cjXd1xPEw8/sendDocument?chat_id=1192657655&document=http://revistas.ung.br/index.php/computacaoaplicada/article/download/3268/2571

*/
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

sendButton = document
  .getElementById('send-button')
  .addEventListener('click', responseMsg);

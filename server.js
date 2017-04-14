const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      request     = require('superagent'),
//      request     = require('request'),
      cheerio     = require('cheerio'),
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, { polling: true });

bot.on('message', (msg) => {
  let userID = msg.chat.id;
  bot.sendMessage(userID, 'I\'m working!');
});

//Concatenar com msg do usuário
let url = 'https://explainshell.com/'+'explain?cmd=cd';

request.get(url, function(err, res){
  if (err) throw err;
  console.log(res.text);
});

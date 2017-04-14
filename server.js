const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      request     = require('request'),
      cheerio     = require('cheerio');
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, { polling: true });

bot.on('message', (msg) => {
  let userID = msg.chat.id;
  bot.sendMessage(userID, 'I\'m working!');
});

request('https://explainshell.com/')
  .on('data', (data) => {
    let $ = cheerio.load(data);
    //Colocar a mensagem do user dentro de val.
    let input = $('#explain').val('blablabla');
    //console.log(input.toString());
  })
  .on('end', () => {
    //
  });

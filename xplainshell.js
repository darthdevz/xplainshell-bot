const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      request     = require('superagent'),
//      request     = require('request'),
      cheerio     = require('cheerio'),
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, { polling: true });

bot.on('message', (msg) => {
  let userID      = msg.chat.id;
  let messageUser = msg.text;
  let url         = 'https://explainshell.com/explain?cmd='+ messageUser;

  request.get(url, function(err, res){
    if (err) throw err;
    let $ = cheerio.load(res.text);
    let answer = $('.help-box').text();
    bot.sendMessage(userID, answer);
  });
});

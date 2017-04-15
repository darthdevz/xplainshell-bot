const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      request     = require('superagent'),
      cheerio     = require('cheerio'),
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, { polling: true });

bot.on('message', (msg) => {
  let userID      = msg.chat.id;
  let messageUser = msg.text;
  let url         = 'https://explainshell.com/explain?cmd='+ messageUser;

  request.get(url, (err, res) => {
    if (err) throw err;

    let $            = cheerio.load(res.text);
    let answer       = $('.help-box').text();
    let errorMessage = "Sorry, this command is invalid or unknown. Try another command."

    bot.sendMessage(userID, answer).catch((error) => {
      bot.sendMessage(userID, errorMessage);
    });
  });
});

const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      request     = require('superagent'),
      cheerio     = require('cheerio'),
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, {webHook: { port: process.env.PORT } });

const url = process.env.APP_URL || 'https://xplainshell-bot.herokuapp.com';

// Isso faz setup do webhook nos servidores do telegram
bot.setWebHook(`${url}/bot${token}`);

bot.on('message', (msg) => {
  let userID      = msg.chat.id,
      messageUser = msg.text,
      url         = 'https://explainshell.com/explain?cmd='+ messageUser;

  request.get(url, (err, res) => {
    if (err) throw err;

    let $             = cheerio.load(res.text),
        answer        = $('.help-box').text(),
        errorMessage  = "Sorry, this command is invalid or unknown. Try another command.";

    bot.sendMessage(userID, answer).catch((error) => {
      bot.sendMessage(userID, errorMessage);
    });
  });
});

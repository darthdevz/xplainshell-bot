const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, { polling: true });

bot.on('message', function(msg) {
  let chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Im working!');
});

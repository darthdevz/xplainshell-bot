const telegramBot = require('node-telegram-bot-api'),
      token       = 'YOUR-API-KEY-HERE',
      bot         = new telegramBot(token, { polling: true });

bot.on('message', function(msg) {
  let chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Im working!');
});

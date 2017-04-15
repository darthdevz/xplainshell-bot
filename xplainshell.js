const telegramBot = require('node-telegram-bot-api'),
      dotenv      = require('dotenv').config(),
      request     = require('superagent'),
      cheerio     = require('cheerio'),
      token       = process.env.TELEGRAM_API,
      bot         = new telegramBot(token, { polling: true });

bot.on('message', (msg) => {
  let userID      = msg.chat.id,
      messageUser = msg.text,
      url         = 'https://explainshell.com/explain?cmd='+ messageUser;

  request.get(url, (err, res) => {
    if (err) throw err;

    let $             = cheerio.load(res.text),
        answer        = $('.help-box').text(),
        params        = $('#command'), //#command is the id used in the document to group all of the elements that contain the individual parts of the command
        main_commands = $('.simplecommandstart'), //selects elements that represent main commands
        errorMessage  = "Sorry, this command is invalid or unknown. Try another command.";

    let symbol_count = params.children().length;
    let param_count = symbol_count - main_commands.length;
    
    let param_max = symbol_count;
    let param_min = param_count - 1;

    //selects the elements which have helpref index greater than the last index of a main command
    params = $('span[helpref^=help-]').slice(param_min,param_max);

    for (let i = 0; i < main_commands.length; i++) {
      console.log(main_commands.children()[i].children[0].data); //testing purposes
    }

    for (let i = 0; i < params.length; i++) {
      console.log(params[i].children[0].data); //testing purposes
    }


    bot.sendMessage(userID, answer).catch((error) => {
      bot.sendMessage(userID, errorMessage);
    });
  });
});

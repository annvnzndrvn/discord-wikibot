const Discord = require("discord.js");

module.exports = {

    reply: function (message, msg) {
        
        message.reply(msg, {split: true})   
    },

    say: function (bot, msg) {

        bot.sendMessage(msg);
    }    
}





const Discord = require("discord.js");

var talkModule = require('./talkModule');
var wikiModule = require('./wikiModule');

var dictionaries = require('./dictionaries');

var request = require("request");

const devToken = 'your_dev_token';
const token = 'your_production_token';

const bot = new Discord.Client({autoReconnect:true});

var isReconnected;

bot.on("ready", () => {
	console.log("wikiBot ready!");
	isReconnected = false;
});


bot.on("message", message => {
	silence = 0;

	console.log(message.content);

	var input = message.content;

	if (input.includes("!wiki "))	
		wikiModule.fetchInfo(message, input);
});


process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});


bot.on("disconnect", () =>
{

});

bot.on("reconnecting", () =>
{

});


bot.login(devToken);

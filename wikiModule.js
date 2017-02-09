var utilities = require('./utilities');

const Discord = require("discord.js");
var http = require('http');
var request = require("request");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var talkModule = require('./talkModule');
var dictionaries = require('./dictionaries');

module.exports = {

    HttpClient: function () {
        this.get = function (url, callback) {

            var httpRequest = new XMLHttpRequest();

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200)
                    callback(httpRequest.responseText);
            }

            httpRequest.open("GET", url, true);
            httpRequest.send(null);
        }
    },

    fetchInfo: function (message, input) {

        var isANaughtyOne = false;

        for (i = 0; i < dictionaries.englishSwear.length; i++) {

            var naughtyWord = dictionaries.englishSwear[i];

            if (input.includes(naughtyWord)) {
                isANaughtyOne = true;
            }
        }

        if (isANaughtyOne === true) {

            var r = Math.floor((Math.random() * dictionaries.negativeRiposte.length) + 1);
            randomNegativeRiposte = dictionaries.negativeRiposte[r];

            talkModule.reply(message, 'Mind your language when addressing me, you ' + randomNegativeRiposte);
        }
        else {
            console.log('fetching answer');

            var query = input.replace('!wiki', '');

            httpClient = new this.HttpClient();

            httpClient.get('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exchars=2000&titles=' + query + '&redirects', function (response) {
                // console.log(response);
                var parsedJson = JSON.parse(response);
                var definition;

                for (var pageId in parsedJson.query.pages) {
                    if (parsedJson.query.pages.hasOwnProperty(pageId)) {
                        definition = parsedJson.query.pages[pageId].extract;
                    }
                }

                if (definition != undefined && definition != null) {
                    var queryCleanedFromHTML = utilities.cleanHtmlTagsFrom(definition);
                    talkModule.reply(message, queryCleanedFromHTML);
                }
                else {
                    talkModule.reply(message, "Try rewording, I'm not the fastest of AIs");
                }
            });
        }
    }
}



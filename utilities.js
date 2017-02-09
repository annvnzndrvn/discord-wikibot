
module.exports = {

    cleanHtmlTagsFrom: function (source) {
        return source.replace(/<(?:.|\n)*?>/gm, '');
    }

}




const { EmbedBuilder } = require('discord.js');
const stop = require('./stop');
const simpleReply = require('../components/simpleReply');
const {getLang} = require("../langManager");
let lang = getLang();

function skip(client, message) {
    try {

        const queue = client.distube.getQueue(message.guild.id);
        if (!queue || queue.songs.length <= 1) {
            simpleReply(`${lang.no_song_to_skip}`, message);
            return stop(client, message);
        }

        client.distube.skip(message.guild.id);
        return simpleReply(`${lang.skipped}`, message);
    } catch (error) {
        if (error.message === 'NO_UP_NEXT') {
            simpleReply(`${lang.no_song_up_next}`, message);
            return stop(client, message);
        } else if (error.messsage === 'NO_QUEUE') {
            return;
        }
    }
}


module.exports = skip;
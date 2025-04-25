const { EmbedBuilder } = require('discord.js');
const stop = require('./stop');
const simpleReply = require('../components/simpleReply');

function skip(client, message) {
    try {

        const queue = client.distube.getQueue(message.guild.id);
        if (!queue || queue.songs.length <= 1) {
            simpleReply('Không có bài hát nào tiếp theo để bỏ qua!', message);
            return stop(client, message);
        }

        client.distube.skip(message.guild.id);
        return simpleReply('Đã skip nha!', message);
    } catch (error) {
        if (error.message === 'NO_UP_NEXT') {
            simpleReply('Không có bài hát tiếp theo!', message);
            return stop(client, message);
        } else if (error.messsage === 'NO_QUEUE') {
            return;
        }
    }
}


module.exports = skip;
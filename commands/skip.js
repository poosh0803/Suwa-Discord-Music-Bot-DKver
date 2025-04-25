const { EmbedBuilder } = require('discord.js');

function skip(client, message) {
    try {

        const queue = client.distube.getQueue(message.guild.id);
        if (!queue || queue.songs.length <= 1) {
            return message.reply('Không có bài hát nào tiếp theo để bỏ qua!');
        }

        client.distube.skip(message.guild.id);
        const embed = new EmbedBuilder()
            .setColor(0xe6a65e)
            .setTitle('Đã skip nha!!')
        message.reply({ embeds: [embed] });
    } catch (error) {
        if (error.message === 'NO_UP_NEXT') {
            message.reply('Không có bài hát nào tiếp theo để bỏ qua!');
        } else {
            message.reply('Đã xảy ra lỗi khi bỏ qua bài hát.');
            console.error(error);
        }
    }
}


module.exports = skip;
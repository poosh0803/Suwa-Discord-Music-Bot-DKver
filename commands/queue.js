const { EmbedBuilder } = require('discord.js');
const  simpleReply  = require('../components/simpleReply');

function queue(client, message) {
    const musicQueue = client.distube.getQueue(message.guild.id);
    if (!musicQueue || !musicQueue.songs.length) {
        return simpleReply('Không có bài hát nào trong danh sách hàng chờ', message);
    }

    const songs = musicQueue.songs;

    const songList = songs
        .slice(0, 10)
        .map((song, index) => {
            const prefix = index === 0 ? '🎵 **Đang phát:**' : `${index}.`;
            return `${prefix} ${song.name} \`[${song.formattedDuration}]\``;
        }).join('\n');

    const embed = new EmbedBuilder()
        .setColor(0xe6a65e)
        .setTitle('Danh sách phát')
        .setDescription(songList)
        .setFooter({ text: `Tổng: ${songs.length} bài hát`, iconURL: message.guild.iconURL() });
    message.reply({ embeds: [embed] });
}

module.exports = queue;
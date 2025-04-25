const { EmbedBuilder } = require('discord.js');


function addSong(client) {
    client.distube.on('addSong', (queue, song) => {
        const embed = new EmbedBuilder()
            .setColor(0xe6a65e)
            .setTitle('🎶 Đã thêm bài hát')
            .setDescription(`**${song.name}**\nThời lượng: \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail || null)
            .setFooter({
                text: `Yêu cầu bởi: ${song.user?.username || 'Unknown'}`,
                iconURL: song.user?.displayAvatarURL() || null
            });
        queue.textChannel.send({ embeds: [embed] });
    });
}

module.exports = addSong;
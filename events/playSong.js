
const { EmbedBuilder } = require('discord.js')
function playSong(client) {
    client.distube.on('playSong', (queue, song) => {
        const embed = new EmbedBuilder()
            .setColor(0xe6a65e)
            .setTitle('🎶 Bắt đầu phát nhạc')
            .setDescription(`**${song.name}**\nThời lượng: \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail || null)
            .setFooter({
                text: `Yêu cầu bởi: ${song.user?.username || 'Unknown'}`,
                iconURL: song.user?.displayAvatarURL() || null
            });

        queue.textChannel.send({ embeds: [embed] });
    });
}

module.exports = playSong;
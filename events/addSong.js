const { EmbedBuilder } = require('discord.js');
const { getLang } = require("../langManager");
let lang = getLang();


function addSong(client) {
    client.distube.on('addSong', (queue, song) => {
        const embed = new EmbedBuilder()
            .setColor(0xe6a65e)
            .setTitle(`🎶 ${lang.added_song}`)
            .setDescription(`**${song.name}**\n${lang.song_duration}: \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail || null)
            .setFooter({
                text: `${lang.requested_by}: ${song.user?.username || 'Unknown'}`,
                iconURL: song.user?.displayAvatarURL() || null
            });
        queue.textChannel.send({ embeds: [embed] });
    });
}

module.exports = addSong;
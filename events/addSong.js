const { EmbedBuilder } = require('discord.js');
const { getLang } = require("../langManager");
const loadingMessages = require('../components/messageStore');
let lang = getLang();


function addSong(client) {
    client.distube.on('addSong', (queue, song) => {
        const loadingMessage = loadingMessages.get(queue.textChannel.guild.id);
        if (loadingMessage) {
            loadingMessage.delete()
            .catch(console.error);
            // Optionally remove the message from map after edit
            loadingMessages.delete(queue.textChannel.guild.id);
        }
        const embed = new EmbedBuilder()
            .setColor(0xe6a65e)
            .setTitle(`🎶 ${lang.added_song}`)
            .setDescription(`[**${song.name}**](${song.url})\n${lang.song_duration}: \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail || null)
            .setFooter({
                text: `${lang.requested_by}: ${song.user?.username || 'Unknown'}`,
                iconURL: song.user?.displayAvatarURL() || null
            });
        queue.textChannel.send({ embeds: [embed] });
    });
}

module.exports = addSong;
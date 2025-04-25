const { EmbedBuilder } = require('discord.js');
const  simpleReply  = require('../components/simpleReply');
const {getLang} = require("../langManager");
let lang =  getLang();

function queue(client, message) {
    const musicQueue = client.distube.getQueue(message.guild.id);
    if (!musicQueue || !musicQueue.songs.length) {
        return simpleReply(`${lang.no_song_in_queue}`, message);
    }

    const songs = musicQueue.songs;

    const songList = songs
        .slice(0, 10)
        .map((song, index) => {
            const prefix = index === 0 ? `🎵 **${lang.queue_currently_playing}:**` : `${index}.`;
            return `${prefix} ${song.name} \`[${song.formattedDuration}]\``;
        }).join('\n');

    const embed = new EmbedBuilder()
        .setColor(0xe6a65e)
        .setTitle(`${lang.queue_list}`)
        .setDescription(songList)
        .setFooter({ text: `${lang.total_songs_in_queue}: ${songs.length} ${lang.songs}`, iconURL: message.guild.iconURL() });
    message.reply({ embeds: [embed] });
}

module.exports = queue;
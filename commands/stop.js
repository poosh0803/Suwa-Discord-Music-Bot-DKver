const { EmbedBuilder } = require('discord.js');
const {getLang} = require("../langManager");

const lang = getLang();


function stop(client, message) {

    client.distube.stop(message.guild.id);
    const embed = new EmbedBuilder()
    .setColor(0xe6a65e)
    .setTitle(`🛑 ${lang.stopped}`)
    return message.reply({ embeds: [embed] });
}

module.exports = stop
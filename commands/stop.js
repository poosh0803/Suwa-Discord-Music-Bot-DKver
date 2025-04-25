const { EmbedBuilder } = require('discord.js');

function stop(client, message) {
    client.distube.stop(message.guild.id);
    const embed = new EmbedBuilder()
    .setColor(0xe6a65e)
    .setTitle('🛑 Đã dừng bot')
    return message.reply({ embeds: [embed] });
}

module.exports = stop
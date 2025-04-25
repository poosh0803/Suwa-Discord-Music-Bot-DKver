const { EmbedBuilder } = require('discord.js');

function simpleReply(context, message) {
    const embed = new EmbedBuilder()
        .setColor(0xe6a65e)
        .setTitle(context)
    return message.channel.send({ embeds: [embed] });
}

module.exports = simpleReply;
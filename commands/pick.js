const { EmbedBuilder } = require('discord.js');

async function pick(message, args) {
    if (args.length < 2) {
        return message.reply('❗ Please provide at least 2 choices, like:\n`!pick option1 option2 [option3 ...]`');
    }
    
    const selected = Math.floor(Math.random() * args.length);
    const selectedChoice = args[selected];

    // Build options list with the chosen one highlighted
    const formattedOptions = args.map((opt, index) => {
        if (index === selected) {
            return `👉 **${opt}**`; // highlight the selected one
        }
        return `• ${opt}`;
    }).join('\n');

    const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle(`🎯 ${message.author.username}, here's the result:`)
        .setDescription(formattedOptions)
        .setFooter({ text: `Picked 1 out of ${args.length} options` })
        .setTimestamp();

    await message.channel.send({ embeds: [embed] });
};
module.exports = pick;
const { AttachmentBuilder } = require('discord.js');
const path = require('path');

const outcomes = [
    { name: '聖筊', image: '../images/roll/v1/01.png', weight: 25 },
    { name: '笑筊', image: '../images/roll/v1/00.png', weight: 25 },
    { name: '陰筊', image: '../images/roll/v1/11.png', weight: 49.99 },
    { name: '神筊', image: '../images/roll/v1/xx.png', weight: 0.01 }, // super rare
];

// Weighted random selection function
function getWeightedRandom(outcomes) {
    const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);
    const r = Math.random() * totalWeight;
    let acc = 0;
    for (const outcome of outcomes) {
        acc += outcome.weight;
        if (r < acc) return outcome;
    }
}

async function roll(message, args) {
    const randomOutcome = getWeightedRandom(outcomes);
    const imagePath = path.join(__dirname, randomOutcome.image);
    const attachment = new AttachmentBuilder(imagePath);
    let msg = args.join(" ");

    await message.channel.send({
        content: `🎲 ${message.author}為了 **${msg}** 擲筊: **${randomOutcome.name}**`,
        files: [attachment],
    });
};

// async function roll(message) {
//     const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
//     const imagePath = path.join(__dirname, randomOutcome.image);
//     const attachment = new AttachmentBuilder(imagePath);

//     const embed = new EmbedBuilder()
//         .setColor(0x00AE86)
//         .setAuthor({
//             name: `${message.author.username} 擲筊`,
//             iconURL: message.author.displayAvatarURL(),
//         })
//         .setTitle(`🎲 結果: **${randomOutcome.name}**`) // Bold formatting works here
//         .setImage(`attachment://${path.basename(imagePath)}`)
//         .setTimestamp();

//     await message.channel.send({
//         embeds: [embed],
//         files: [attachment],
//     });
// }

module.exports = roll;
const { EmbedBuilder } = require('discord.js');
const https = require('https');

async function fetchCatImage() {
    return new Promise((resolve, reject) => {
        https.get('https://api.thecatapi.com/v1/images/search', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json[0] && json[0].url) {
                        resolve(json[0].url);
                    } else {
                        reject('No image found');
                    }
                } catch (err) {
                    reject('Error parsing cat image response');
                }
            });
        }).on('error', (err) => reject(err.message));
    });
}

async function cat(message) {
    try {
        const imageUrl = await fetchCatImage();

        const embed = new EmbedBuilder()
            .setColor(0xffc0cb)
            .setTitle('🐱 Meow!')
            .setImage(imageUrl)
            .setFooter({ text: `${message.author.username} requested a cat.` })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    } catch (err) {
        await message.channel.send(`😿 Couldn't fetch a cat right now. Try again later.`);
        console.error('Cat error:', err);
    }
}

module.exports = cat;
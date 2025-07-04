const { EmbedBuilder } = require('discord.js');
const https = require('https');

async function fetchMoneyData() {
    return new Promise((resolve, reject) => {
        // TODO: Replace with your actual API endpoint
        const url = 'https://your-api.com/money';
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (err) {
                    reject('Error parsing API response');
                }
            });
        }).on('error', (err) => reject(err.message));
    });
}

async function money(message) {
    try {
        const data = await fetchMoneyData();
        let desc = '**Payment Instructions:**\n' + data.paymentInstructions.join('\n') + '\n\n';
        desc += '**Final Contribution:**\n' + data.finalContribution.join('\n') + '\n\n';
        desc += '**Descriptions:**\n';
        for (const [name, d] of Object.entries(data.descriptions)) {
            desc += `${name}: ${d}\n`;
        }

        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Money Data')
            .setDescription(desc)
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    } catch (err) {
        await message.channel.send('Failed to fetch money data.');
        console.error('Money error:', err);
    }
}

module.exports = money;

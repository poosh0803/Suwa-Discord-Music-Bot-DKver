
const ytsr = require('@distube/ytsr');
const simpleReply = require('../components/simpleReply');
const {getLang} = require("../langManager");

lang = getLang();

async function play(client, message, args) {
    let query = args.join(" ");
    console.log();
    const voice = message.member.voice.channel;
    if (!voice)
        return simpleReply(`${lang.user_not_in_voice}`, message);
    if (!query)
        return simpleReply(`${lang.no_query}`, message);

    const loadingMessage = await message.channel.send('🎶 Loading song...');

    const result = await ytsr(query, { safeSearch: true, limit: 1 });
    if (result.results >= 1) {
        query = result.items[0].url;
    } else {
        return simpleReply(`${lang.song_not_found}`, message);
    }

    try {
        return client.distube.play(voice, query, {
            textChannel: message.channel,
            member: message.member,
            position: 0,
        });
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = play;
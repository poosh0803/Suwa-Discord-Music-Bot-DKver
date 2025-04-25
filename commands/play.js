
const ytsr = require('@distube/ytsr');
const simpleReply = require('../components/simpleReply');

async function play(client, message, args) {
    let query = args.join(" ");
    const voice = message.member.voice.channel;
    if (!voice)
        return simpleReply('Vui lòng vào voice để bắt đầu phát nhạc!', message);
    if (!query)
        return simpleReply('Vui lòng điền tên bài hát hoặc link', message);



    const result = await ytsr(query, { safeSearch: true, limit: 1 });
    if (result.results >= 1) {
        query = result.items[0].url;
    } else {
        return simpleReply('Không tìm thấy bài hát này', message);
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
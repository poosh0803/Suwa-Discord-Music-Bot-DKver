

function play(client, message, args) {
    const query = args.join(" ");

    const voice = message.member.voice.channel;
    if (!voice)
        return message.reply('Vui lòng vào voice để bắt đầu phát nhạc!');
    if (!query)
        return message.reply('Vui lòng điền tên bài hát hoặc link');
    try {
        client.distube.play(voice, query, {
            textChannel: message.channel,
            member: message.member,
            position: 0,
        });
    } catch (error) {
        console.log(error);
        message.reply('Lỗi khi phát nhạc!');
        return message.reply(error);
    }
}

module.exports = play;
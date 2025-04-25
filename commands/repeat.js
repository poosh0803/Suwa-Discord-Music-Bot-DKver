
const  simpleReply  = require('../components/simpleReply');


function repeat(client, guildId, repeatMode = 0, message) {
    let msg;
    if(repeatMode === 0) {
        msg = 'Chế độ lặp lại: Tắt';
    } else if(repeatMode === 1) {
        msg = 'Chế độ lặp lại: Bài hát';
    } else if(repeatMode === 2) {
        msg = 'Chế độ lặp lại: Hàng chờ';
    }

    simpleReply(msg, message);

    return client.distube.setRepeatMode(guildId, repeatMode);
}

module.exports = repeat;
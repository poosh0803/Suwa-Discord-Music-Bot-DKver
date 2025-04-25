
const  simpleReply  = require('../components/simpleReply');
const {getLang} = require("../langManager");
let lang = getLang();

function repeat(client, guildId, repeatMode = 0, message) {
    let msg;
    if(repeatMode === 0) {
        msg = `${lang.repeat_mode}: ${lang.repeat_mode_off}`;
    } else if(repeatMode === 1) {
        msg = `${lang.repeat_mode}: ${lang.repeat_mode_song}`;
    } else if(repeatMode === 2) {
        msg = `${lang.repeat_mode}: ${lang.repeat_mode_queue}`;
    }

    simpleReply(msg, message);

    return client.distube.setRepeatMode(guildId, repeatMode);
}

module.exports = repeat;
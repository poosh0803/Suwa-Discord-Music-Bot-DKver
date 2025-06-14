const fs = require('fs')
let lang = null;

function intializeLang(lang_code = 'en_us') {
    const path = `./lang/${lang_code}.json`;
    if(fs.existsSync(path)) {
        lang = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
        lang = JSON.parse(fs.readFileSync('./lang/en_us.json', 'utf8'));
    }
}

function getLang() {
    return lang;
}

module.exports = {intializeLang, getLang}
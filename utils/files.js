let fs = require('fs')

module.exports = {
    fromFileToArray: function(path) {
        let text = fs.readFileSync(path, 'utf-8');
        return text.split('\n');

    }
}
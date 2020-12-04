let fs = require('fs');
const { sep } = require('path');

module.exports = {
    fromFileToArray: function(path, separator = '\n') {
        let text = fs.readFileSync(path, 'utf-8');
        return text.split(separator);

    }
}
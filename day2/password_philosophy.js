const file = require("../utils/files.js");
const password = require('./PasswordValidator');


let puzzle_input = file.fromFileToArray(process.argv[2]);
let validator = new password.PassWordValidator();
let numberOfPasswordValid = 0;

for (let line of puzzle_input) {
    if (line.length > 0) {
        validator.getPasswordPolicy(line);
        // Part 1
        /*
        if (validator.isPasswordValid()) {
            numberOfPasswordValid++;
        }
        */
        if (validator.isPasswordValidPosition()) {
            numberOfPasswordValid++;
        }
    }
}
console.log(numberOfPasswordValid);
/* 
Part 1 - Answer : 660
Part 2 - Answer : 530
*/
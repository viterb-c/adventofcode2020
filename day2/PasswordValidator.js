const { count } = require("console");
const { runInThisContext } = require("vm");

class PassWordValidator {
    constructor() {
        this.password = '';
        this.lowLetter = 0;
        this.highLetter = 0,
        this.letter = '';
    }

    getPasswordPolicy(line) {
        const arrayPolicy = line.split(' ');
        this.password = arrayPolicy[2];
        this.letter = arrayPolicy[1][0];

        this.lowLetter = Number(arrayPolicy[0].split('-')[0]);
        this.highLetter = Number(arrayPolicy[0].split('-')[1]);
    }

    isPasswordValid() {
        let countLetter = 0;

        for (let s of this.password) {
            if (s == this.letter) {
                countLetter++;
            }
        }
        // console.log(`${this.letter} - ${countLetter} - ${this.lowLetter} - ${this.highLetter}`)
        return countLetter >= this.lowLetter && countLetter <= this.highLetter; 
    }

    isPasswordValidPosition() {
        return (this.password[this.lowLetter - 1] == this.letter && this.password[this.highLetter - 1] != this.letter) ||
               (this.password[this.lowLetter - 1] != this.letter && this.password[this.highLetter - 1] == this.letter)
    }
}

exports.PassWordValidator = PassWordValidator;
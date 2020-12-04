var utils = require("../utils/files");

const passports = utils.fromFileToArray(process.argv[2], '\n\n');

// Part 1

isPassportValid = (passport, fields) => {
    for (const field of fields) {
        if (passport.indexOf(field) == -1) {
            return false;
        }
    }
    return true;
}

numberOfValidPassports = (passports, passportFields) => {
    let number = 0;
    passports.forEach(passport => {
        if (isPassportValid(passport, passportFields)) {
            number += 1;
        }
    });
    return number;
}

console.log(`Part 1 answer : ${numberOfValidPassports(passports, ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'])}`);
// Answer : 190

// Part 2

numberOfValidPassportsWithFields = (passports) => {
    let number = 0;
    passports.forEach(passport => {
        if (checkAllFields(passport)) {
            number += 1;
        }
    });
    return number;
}

checkAllFields = (passport) => {
    return isPassportValid(passport, ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']) &&
        yearValidator(passport, 'byr', 1920, 2002) &&
        yearValidator(passport, 'iyr', 2010, 2020) &&
        yearValidator(passport, 'eyr', 2020, 2030) &&
        hgtValidator(passport) &&
        hclValidator(passport) &&
        eclValidator(passport, ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']) &&
        pidValidator(passport);
}

yearValidator = (passport, field, min, max) => {
    const index = passport.indexOf(field);
    const year = Number(passport.substring(index + 4, index + 8));
    return year >= min && year <= max;
}

hgtValidator = (passport) => {
    const index = passport.indexOf('hgt');
    const heightField = passport.substring(index + 4, index + 9);
    if (heightField.includes('cm')) {
        const height = Number(passport.substring(index + 4, index + 7));
        return height >= 150 && height <= 193;
    } else if (heightField.includes('in')) {
        const height = Number(passport.substring(index + 4, index + 6));
        return height >= 59 && height <= 76;
    }
    return false;
}

hclValidator = (passport) => {
    const index = passport.indexOf('hcl');
    if (passport[index + 4] != '#') {
        return false;
    }
    for (let i = index + 5; i < index + 11; i++) {
        if (typeof Number(passport[i]) != 'number' && (passport[i] < 'a' || passport > 'f')) {
            return false;
        }
    }
    return true;
}

eclValidator = (passport, validEyeColors) => {
    const index = passport.indexOf('ecl');
    const eyeColor = passport.substring(index + 4, index + 7);
    return validEyeColors.indexOf(eyeColor) != -1;
}

pidValidator = (passport) => {
    const index = passport.indexOf('pid');
    let i = index + 4;
    while (passport[i] >= '0' && passport[i] <= '9') {
        i++;
    }
    if (i != index + 13) {
        return false;
    }
    const passportId = passport.substring(index + 4, index + 13);
    return typeof Number(passportId) == 'number';
}

console.log(`Part 2 answer : ${numberOfValidPassportsWithFields(passports)}`);
// Answer : 121 
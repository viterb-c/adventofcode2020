var utils = require('../utils/files.js');

let puzzle_input = utils.fromFileToArray(process.argv[2]).map(v => Number(v));

sumToTarget = (array, target) => {
    values = new Set();
    for (let i = 0; i < array.length; i++) {
        let value = target - array[i];
        if (values.has(value)) {
            console.log(`${array[i]} * ${value} = ${array[i] * value}`);
            break;
        }
        values.add(array[i]);
    }
};

sumTripletToTarget = (array, target) => {
    for (let i = 0; i < array.length; i++) {
        values = new Set();
        let sum = target - array[i];
        for (let j = i + 1; j < array.length; j++) {
            if (values.has(sum - array[j])) {
                console.log(`${array[i]} * ${array[j]} * ${sum - array[j]} = ${array[i] * array[j] * (sum - array[j])}`)
                return;
            }
            values.add(array[j]);
        }
    }
}


sumToTarget(puzzle_input, 2020)
// Answer : 829 * 1191 = 987339
sumTripletToTarget(puzzle_input, 2020);
// Answer : 945 * 418 * 657 = 259521570
const fileUtils = require("../utils/files");

const input = fileUtils.fromFileToArray(process.argv[2]);
const startingNumbers = input[0].split(',').map(n => Number(n));

// Part 1
getNumberSpoken = (round, prevNumber, startingNumbers, mapNumber) => {
    if (round < startingNumbers.length) {
        return startingNumbers[round];
    } else if (mapNumber.has(prevNumber) && mapNumber.get(prevNumber).length > 1) {
        let values = mapNumber.get(prevNumber);
        return (values.length > 1) ? (values[0] - values[1]) : (round - values[0]);
    } else {
        return 0;
    }
}

addNumberToMap = (mapNumber, number, round) => {
    const arrayValueInMap = mapNumber.get(number) || [];
    arrayValueInMap.unshift(round);
    if (arrayValueInMap.length > 2) {
        arrayValueInMap.pop();
    }
    mapNumber.set(number, arrayValueInMap);
}

findNthNumber = (startingNumbers, n) => {
    let prevNumber = null;
    const mapNumber = new Map();

    for (let i = 0; i < n; i++) {
        prevNumber = getNumberSpoken(i, prevNumber, startingNumbers, mapNumber);
        addNumberToMap(mapNumber, prevNumber, i);
    }
    return prevNumber;
}
console.log(`Part 1 : ${findNthNumber(startingNumbers, 2020)}`);
// Answer 234
console.log(`Part 2 : ${findNthNumber(startingNumbers, 30000000)}`);
// Answer 8984
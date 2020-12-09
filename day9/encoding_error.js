const { REPL_MODE_STRICT } = require("repl");
const fileUtils = require("../utils/files");

const dataNumbers = fileUtils.fromFileToArray(process.argv[2]);

// Part 1

isSumOfTwo = (target, setNumber) => {
    let value = 0;

    for (let number of setNumber.values()) {
        value = (target > number) ? target - number : number - target;
        if (setNumber.has(value)) {
            return true;
        }
    }
    return false;
}

initPreamble = (data, size) => {
    const preamble = new Set();
    for (let i = 0; i < size; i++) {
        preamble.add(Number(data[i]));
    }
    return preamble;
}

findNumberNotSum = (data, size) => {
    const setNumber = initPreamble(data, size);
    for (let i = size; i < data.length; i++) {
        if (!isSumOfTwo(data[i], setNumber)) {
            return data[i];
        }
        setNumber.delete(setNumber.values().next().value);
        setNumber.add(Number(data[i]));
    }
}

console.log(`Part 1 : ${findNumberNotSum(dataNumbers, 25)}`);
// Answer 41682220

isListSum = (data, index, target) => {
    const numberList = [];
    let sum = 0;
    for (let i = index; i < data.length; i++) {
        sum += Number(data[i]);
        numberList.push(Number(data[i]));
        if (sum == target) {
            return numberList;
        } else if (sum > target) {
            return null;
        }
    }
    return numberList;
}

findListSumNumbersToTarget = (data, target) => {
    for (let i = 0; i < data.length; i++) {
        const list = isListSum(data, i, target);
        if (list != null) {
            return Math.min(...list) + Math.max(...list);
        }
    }
}

console.log(`Part 2 : ${findListSumNumbersToTarget(dataNumbers, 41682220)}`)
// Answer : 5388976
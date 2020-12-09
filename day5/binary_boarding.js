const fileUtils = require('../utils/files');




getNumberRowFromBoardingPass = (boardingPass) => {
    let rangeRow = {lower: 0, upper: 127};
    for (let i = 0; i < 7; i++) {
        rangeRow = determineRange(boardingPass[i], 'F', 'B', rangeRow);
    }
    return rangeRow.lower;
}

getNumberColumnFromBoardingPass = (boardingPass) => {
    let rangeColumn = {lower: 0, upper: 7};
    for (let i = 7; i < 10; i++) {
        rangeColumn = determineRange(boardingPass[i], 'L', 'R', rangeColumn);
    }
    return rangeColumn.lower;
}

determineRange = (letter, lowerLetter, upperLetter, rangeRow) => {
    if (letter == lowerLetter) {
        rangeRow.upper = Math.floor((rangeRow.upper + rangeRow.lower) / 2);
    } else if (letter == upperLetter) {
        rangeRow.lower = Math.round((rangeRow.upper + rangeRow.lower) / 2);
    }
    return rangeRow 
}

getSeatId = (boardingPass) => {
    const row = getNumberRowFromBoardingPass(boardingPass);
    const column = getNumberColumnFromBoardingPass(boardingPass);
    return (row * 8 + column);
}

getHighestSeat = (boardingPasses) => {
    let highestId = 0;
    boardingPasses.forEach(boardingPass => {
        const seatId = getSeatId(boardingPass);
        highestId = (seatId > highestId) ? seatId : highestId;
    });
    return highestId;
}

const boardingPasses = fileUtils.fromFileToArray(process.argv[2]);
if (!boardingPasses || boardingPasses.length == 0) {
    return;
}
console.log(getHighestSeat(boardingPasses));
// Part 1 answer : 989

getAllSeatId = (boardingPasses) => {
    const seatIds = [];
    boardingPasses.forEach(boardingPass => {
        if (boardingPass.length > 0) {
            seatIds.push(getSeatId(boardingPass));
        }
    });
    return seatIds;
}

const allSeatIds = getAllSeatId(boardingPasses).sort((a, b) => a - b);
console.log(allSeatIds.filter((v, i, arr) => arr[i + 1] != v + 1));
// Part 2, answer : 548<
const fileUtils = require("../utils/files");

const instructions = fileUtils.fromFileToArray(process.argv[2]);

// Part 1

getInstruction = (instructions, index) => {
    if (instructions[index].length == 0) {
        return null;
    }
    const tabInstruction = instructions[index].split(' ');
    return {instruction: tabInstruction[0], arg: Number(tabInstruction[1])};
}

executeInstruction = (instructions, index, setInstructions) => {
    const command = getInstruction(instructions, index);
    if (setInstructions.has(index)) {
        return 0;
    }
    setInstructions.add(index)
    switch (command.instruction) {
        case 'acc':
            return executeInstruction(instructions, index + 1, setInstructions) + command.arg;
        case 'jmp':
            return executeInstruction(instructions, index + command.arg, setInstructions);
        case 'nop': 
            return executeInstruction(instructions, index + 1, setInstructions);
    }
}

const setInstructions = new Set();
console.log(executeInstruction(instructions, 0, setInstructions));
// Answer 1832

// Part 2

getAllIndex = (instructions) => {
    const indexes = [];
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].includes("jmp") || instructions[i].includes("nop")) {
            indexes.push(i);
        }
    }
    return indexes;
}

replaceInstruction = (instruction) => {
    if (instruction.includes("jmp")) {
        return instruction.replace("jmp", "nop");
    } else if (instruction.includes("nop")) {
        return instruction.replace("nop", "jmp");
    }
}

executeInstructionUntilEndFile = (instructions, index, setInstructions) => {
    if (setInstructions.has(index)) {
        return NaN;
    }
    const command = getInstruction(instructions, index);
    if (command == null) {
        return 0;
    }
    setInstructions.add(index)
    switch (command.instruction) {
        case 'acc':
            return executeInstructionUntilEndFile(instructions, index + 1, setInstructions) + command.arg;
        case 'jmp':
            return executeInstructionUntilEndFile(instructions, index + command.arg, setInstructions);
        case 'nop': 
            return executeInstructionUntilEndFile(instructions, index + 1, setInstructions);
    }
}

getValueAccTerminates = (instructions) => {
    const indexesComm = getAllIndex(instructions);
    for (const index of indexesComm) {
        const setInstructions = new Set();

        instructions[index] = replaceInstruction(instructions[index]);
        const accValue = executeInstructionUntilEndFile(instructions, 0, setInstructions);
        if (!isNaN(accValue)) {
            return accValue;
        }
        instructions[index] = replaceInstruction(instructions[index]); 
    }
}
console.log(getValueAccTerminates(instructions));
// Answer 662
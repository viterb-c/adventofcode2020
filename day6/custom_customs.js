const fileUtils = require('../utils/files');

// Input 
const answers = fileUtils.fromFileToArray(process.argv[2], "\n\n");
if (!answers || answers.length == 0) {
    return;
}

getNumberAnswers = (answers) => {
    let numberOfAnswers = 0;
    answers.forEach(groupAnswers => {
        numberOfAnswers += getAnswersFromGroup(groupAnswers);
    });
    return numberOfAnswers;
}

getAnswersFromGroup = (groupAnswers) => {
    let setAnswers = new Set();
    const answers = groupAnswers.split('\n');
    answers.forEach(personAnswer => {
        for (let i = 0; i < personAnswer.length; i++) {
            setAnswers.add(personAnswer[i]);
        }
    });
    return setAnswers.size;
}



getCommunAnswersFromGroup = (groupAnswers) => {
    const answers = groupAnswers.split('\n');
    
    if (answers.length > 1) {
        let communAnswers = 0;
        let commun = false;
        const firstAnswer = answers[0];
        for (let i = 0; i < firstAnswer.length; i++) {
            commun = true;
            for (let j = 1; j < answers.length; j++) {
                
                if (answers[j].indexOf(firstAnswer[i]) == -1) {
                    commun = false;
                }
            }
            communAnswers += (commun ? 1 : 0);
        }
        return communAnswers;
    } else {
        return answers[0].length;
    }
}

getNumberCommunAnswers = (answers) => {
    let numberOfAnswers = 0;
    answers.forEach(groupAnswers => {
        numberOfAnswers += getCommunAnswersFromGroup(groupAnswers);
    });
    return numberOfAnswers;
}

// Part 1
console.log(`Part 1 : ${getNumberAnswers(answers)}`);
// Answer : 6735

// Part 2 
console.log(`Part 2 : ${getNumberCommunAnswers(answers)}`);
// Answer : 3221
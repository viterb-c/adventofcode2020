const { cpuUsage } = require('process');
const fileUtils = require('../utils/files');

const listRules = fileUtils.fromFileToArray(process.argv[2]);
if (!listRules || listRules.length == 0) {
    return;
}

// Part 1

getNumberBagsContains = (listRules, bagToFind) => {
    const mapRules = getRules(listRules);
};

setKey = (key) => {
    const tabKey = key.trim().split(' ');
    return `${tabKey[0]} ${tabKey[1]}`;
}

setValues = (bags) => {
    if (bags.trim() == "no other bags.") {
        return [];
    }
    const tabContainsBags = [];
    const tabBags = bags.split(',')
    tabBags.forEach(bag => {
        const tmp = bag.trim().split(' ');
        tabContainsBags.push({number: Number(tmp[0]), bag: `${tmp[1]} ${tmp[2]}`});
    })
    return tabContainsBags;
};

getRules = (listRules) => {
    const mapRules = new Map();
    listRules.forEach(rule => {
        if (rule.length > 0) {
            const tabRule = rule.split('contain');
            const ruleKey = setKey(tabRule[0]);
            const ruleValues = setValues(tabRule[1]);
            mapRules.set(ruleKey, ruleValues);
        }
    });
    return mapRules;
}

canRulesContainsBag = (rules, currentBag, bag) => {
    const currentBagRules = rules.get(currentBag);
    if (currentBagRules.length == 0) {
        return false;
    }
    if (currentBagRules.find(rule => rule.bag == bag) != undefined) {
        return true;
    }
    for (let i = 0; i < currentBagRules.length; i++) {
        if (canRulesContainsBag(rules, currentBagRules[i].bag, bag) == true) {
            return true;
        }
    }
    return false;
}

const handyRules = getRules(listRules);
let bags = 0;
for (const key of handyRules.keys()) {
    if (canRulesContainsBag(handyRules, key, "shiny gold") == true) {
        bags += 1;
    }
}
console.log(`Part 1 : ${bags}`);
// Answer : 151


// Part 2
howManyBagsContainsBag = (rules, currentBag) => {
    let numberOfBags = 0;
    const currentBagRules = rules.get(currentBag);
    if (currentBagRules.length == 0) {
        return 0;
    }
    for (let i = 0; i < currentBagRules.length; i++) {
        numberOfBags += currentBagRules[i].number + currentBagRules[i].number * howManyBagsContainsBag(rules, currentBagRules[i].bag);
    }
    return numberOfBags;
}

let numberOfBags = howManyBagsContainsBag(handyRules, "shiny gold");
console.log(`Part 2 : ${numberOfBags}`);
// Answer : 41559
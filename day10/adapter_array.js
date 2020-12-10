const fileUtils = require("../utils/files");

const adaptersArray = fileUtils.fromFileToArray(process.argv[2]).map(a => Number(a));

// Part 1 

addElementToMap = (map, element) => {
    if (map.has(element)) {
        map.set(element, map.get(element) + 1);
    } else {
        map.set(element, 1);
    }
    return map;
}

findNextAdapter = (setAdapters, currentAdapter) => {
    for (let i = 1; i < 4; i++) {
        if (setAdapters.has(currentAdapter + i)) {
            return i;
        }
    }
    return 0;
}

findDifferencesMultiplied = (adapters) => {
    const setAdapters = new Set(adapters);
    const mapDiffAdapters = new Map();
    let differenceAdapters = 0;
    let currentAdapter = 0;

    while ((differenceAdapters = findNextAdapter(setAdapters, currentAdapter)) != 0) {
        addElementToMap(mapDiffAdapters, differenceAdapters);
        currentAdapter += differenceAdapters;
    }
    addElementToMap(mapDiffAdapters, 3);
    return mapDiffAdapters.get(1) * mapDiffAdapters.get(3);
}

console.log(`Part 1 : ${findDifferencesMultiplied(adaptersArray)}`);
// Answer : 2574

// Part 2
findAllNextAdapter = (setAdapters, currentAdapters) => {
    let nextAdapters = new Set();

    for (let adapter of currentAdapters) {
        for (let i = 1; i < 4; i++) {
            if (setAdapters.has(adapter + i)) {
                nextAdapters.add(adapter + i);
            }
        }
    }
    return nextAdapters;
}

findAllPathAdapters = (adapters) => {
    const setAdapters = new Set(adapters);
    const pathAdapters = new Array([0]);
    let currentAdapters = new Set([0]);

    
    while (currentAdapters.size  != 0) {
        currentAdapters = findAllNextAdapter(setAdapters, currentAdapters);
        pathAdapters.push(currentAdapters);
    }
    console.log(pathAdapters);
}
findAllPathAdapters(adaptersArray);
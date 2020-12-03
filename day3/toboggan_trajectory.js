const trajectory = require('./SlopTrajectory');

// Part 1
let gps = new trajectory.SlopTrajectory(3, 1);
gps.setGeology(process.argv[2]);
console.log(`Number of trees on path : ${gps.countTreesOnPath()}`);
// Answer : 176

// Part 2
const pathTrees = [];
gps.changeDirections(1, 1);
pathTrees.push(gps.countTreesOnPath());

gps.changeDirections(3, 1);
pathTrees.push(gps.countTreesOnPath());

gps.changeDirections(5, 1);
pathTrees.push(gps.countTreesOnPath());

gps.changeDirections(7, 1);
pathTrees.push(gps.countTreesOnPath());

gps.changeDirections(1, 2);
pathTrees.push(gps.countTreesOnPath());

console.log(`product of trees : ${pathTrees.reduce((trees, currentValue) => trees * currentValue)}`);
// Answer : 5872458240
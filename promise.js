var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var functions = require("./functions");

// read data
var employees = fs.readFileAsync("employees.json");
var bonuses = fs.readFileAsync("bonuses.json");

var p = Promise.all([employees, bonuses]); // combine promises

p.then(function(combined) {
    // extract data into JavaScript objects
    var employee = JSON.parse(combined[0]);
    var bonus = JSON.parse(combined[1]);
    var extracted = [employee, bonus];
    return extracted;
}).then(function(extracted) {
    // get list of employees who got bonuses and their new salaries
    var gotBonuses = functions.getBonusedEmployees(extracted[0],
        extracted[1]);
    return gotBonuses;
}).then(function(gotBonuses) {
    // write list to file bonusedEmployees.json
    fs.writeFileAsync("bonusedEmployees.json", JSON.stringify(gotBonuses));
    // log information
    console.log(functions.makeLog(gotBonuses));
}, function(err) {
    console.log(err);
});

var fs = require("fs");

var getBonusedEmployees = function(employees, bonuses) {
    // give a bonus to all employees and return list of bonused employees

    var gotBonuses = [];
    var bonus = Object.values(bonuses);

    for (i = 0; i < employees.length; i++) { // loop through all employees
        if (bonus[i] === true) {
            var newSalary = employees[i].salary +
            1000 * employees[i].yearsWorking; // compute new salary
            // add id, full name, and new salary to list
            gotBonuses.push({"id":employees[i].id,"fullName":employees[i].name.first
            + " " + employees[i].name.last,"newSalary":newSalary});
        }
    }
    return gotBonuses;
};

var makeLog = function(gotBonuses) {
    // generate log information for bonused employees
    var i;
    for (i = 0; i < gotBonuses.length; i++) { // loop through bonused employees
        fs.appendFile("log.txt", "Full name: "
        + JSON.stringify(gotBonuses[i].fullName) + " New salary: "
        + JSON.stringify(gotBonuses[i].newSalary) + "\n", function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    return "All bonuses added and logged."; 
};

// export module
module.exports = {
    getBonusedEmployees: getBonusedEmployees,
    makeLog: makeLog
}

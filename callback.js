var fs = require("fs");
var functions = require("./functions");

// read employee information
fs.readFile("employees.json", function(err, data) {
    if (err) {
        console.log(err);
    }
    var employees = JSON.parse(data); // extract data into JavaScript object

    // read bonus information
    fs.readFile("bonuses.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        var bonuses = JSON.parse(data); // extract data into JavaScript object

        // get list of employees who got bonuses and their new salaries
        var gotBonuses = functions.getBonusedEmployees(employees, bonuses);

        // write list to file bonusedEmployees.json
        fs.writeFile("bonusedEmployees.json", JSON.stringify(gotBonuses),
        function (err) {
            if (err) {
                console.log(err);
            }
        });
        // log information and print to console saying process is done
        console.log(functions.makeLog(gotBonuses));
    });
});

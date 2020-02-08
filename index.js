const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhose",

    //Local Port
    port: 3306,

    //Username
    user:"root",

    //Password
    password:"",
    database:"EMS_db"
})

connection.connect(function(err) {
    if(err) throw err;
    runSearch();
})

const runSearch = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
         "Add employee",
         "View employee",
         "Update employee",
         "Delete employee"
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
        case "Add employee":
            addEmployee();
            break;
        case "View employee":
            viewEmployee();
            break;
        case "Update employee":
            updateEmployee();
            break;
        case "Delete employee":
            deleteEmployee();
            break;
        case "exit":
            connection.end():
            break;
        }
    })
}

const addEmployee = () => {
    
}


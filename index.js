const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    //Local Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "Pepsi0109j",
    database: "EMS_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log('connection')
    start();
})

const start = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Exit"
        ]
    })
        .then(function (answer) {
            if (answer.action === 'View all departments') {
                viewDepartments();
            } else if (answer.action === 'View all roles') {
                viewRoles();
            } else if (answer.action === 'View all employees') {
                viewEmployees();
            } else if (answer.action === 'Add a department') {
                addDepartment();
            } else if (answer.action === 'Add a role') {
                addRole();
            } else if (answer.action === 'Add an employee') {
                addEmployee();
            } else if (answer.action === 'Update employee role') {
                updateRole();
            }
            else if (answer.action === 'Exit') {
                connection.end();
            }
        })
}

let viewDepartments = () => {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        //console.log("Departments")
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        });
        start();
    });
};

let viewRoles = () => {
    let query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        //console.log('roles')
        res.forEach(roles => {
            console.log(`ID: ${roles.id} | Title: ${$roles.titile} | Salary: ${roles.salary} | Department ID: ${roles.department_id}`);
        });
        start();
    });
};

let viewEmployees = () => {
    let query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        //console.log('Employees');
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.roles.id} | Manager ID: ${employee.manager_id}`);
        })
        start();
    });
};

let addDepartment = () => {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the name of the department?"
    }).then(function (answer) {
        let query = "INSERT INTO department (name) VALUES  (?)";
        connection.query(query, answer.department, function (err, res) {
            console.log(`You have added: ${answer.department}`)
        })
        viewDepartments();
    });
};

let addRole = () => {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
    },
    {
        namer: "departmentName",
        type: "list",
        message: "Which department does this role belong to?",
        choices: () => {
            let choicesArr = [];
            res.forEach(res => {
                choicesArr.push(res.name);
                console.log(choicesArr);
            })
            return choicesArr;
        }
    }
    ]).then(function (answer) {
        let department = answer.departmentName;
        connection.query("SELECT * FROM Department", function (err, res) {
            if (err) throw err;
            let newDepartment = res.filter(function (res) {
                return res.name === department;
            })
            let id = newDepartment[0].id;
            let query = "INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)";
            let values = [answer.title, parseInt(answer.salary), id]
            connection.query(query, function (err, res) {
                console.log(`You have added: ${(values[0])}`)
            })
        })
        viewRoles()
    })
}

async function addEmployee() {
    connection.query('SELECT * FROM roles', function (err, result) {
        if (err) throw (err);
        inquirer.prompt([{
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "roleName",
                type: "list",
                message: "What role does the new employee have?",
                choices: () => {
                    rolesArray = [];
                    result.forEach(result => {
                        rolesArray.push(
                            result.title
                        );
                    })
                    return rolesArray;
                }
            }
            ])
            .then(function (answer) {
                console.log(answer);
                const role = answer.roleName;
                connection.query('SELECT * FROM role', function (err, res) {
                    if (err) throw (err);
                    let filteredRole = res.filter(function (res) {
                        return res.title == role;
                    })
                    let roleId = filteredRole[0].id;
                    connection.query("SELECT * FROM employee", function (err, res) {
                        inquirer.prompt([
                                {
                                    name: "manager",
                                    type: "list",
                                    message: "Who is your manager?",
                                    choices: function () {
                                        managersArray = []
                                        res.forEach(res => {
                                            managersArray.push(
                                                res.last_name)

                                        })
                                        return managersArray;
                                    }
                                }
                            ]).then(function (managerAnswer) {
                                const manager = managerAnswer.manager;
                                connection.query('SELECT * FROM employee', function (err, res) {
                                    if (err) throw (err);
                                    let filteredManager = res.filter(function (res) {
                                        return res.last_name == manager;
                                    })
                                    let managerId = filteredManager[0].id;
                                    console.log(managerAnswer);
                                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                                    let values = [answer.firstName, answer.lastName, roleId, managerId]
                                    console.log(values);
                                    connection.query(query, values,
                                        function (err, res, fields) {
                                            console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                                        })
                                    viewEmployees();
                                })
                            })
                    })
                })
            })
    })
}

let updateRole = () => {
    connection.query('SELECT * FROM employee', function (err, result) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "employeeName",
                type: "list",
                message: "Which employee's role is changing?",
                choices: () => {
                    employeeArr = [];
                    result.forEach(result => {
                        employeeArr.push(
                            result.last_name
                        );
                    })
                    return employeeArr;
                }
            }
        ])
            .then(function (answer) {
                console.log(answer);
                const name = answer.employeeName;
                connection.query("SELECT * FROM roles", function (err, res) {
                    inquirer.prompt([
                            {
                                name: "role",
                                type: "list",
                                message: "What is their new role?",
                                choices: function () {
                                    rolesArray = [];
                                    res.forEach(res => {
                                        rolesArray.push(
                                            res.title)

                                    })
                                    return rolesArray;
                                }
                            }
                        ]).then(function (rolesAnswer) {
                            let roles = rolesAnswer.roles;
                            console.log(rolesAnswer.roles);
                            connection.query('SELECT * FROM role WHERE title = ?', [roles], function (err, res) {
                                if (err) throw (err);
                                let roleId = res[0].id;
                                let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                                let values = [roleId, name]
                                console.log(values);
                                connection.query(query, values,
                                    function (err, res, fields) {
                                        console.log(`You have updated ${name}'s role to ${role}.`)
                                    })
                                viewEmployees();
                            })
                        })
                })
            })
    })

}








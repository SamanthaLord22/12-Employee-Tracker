
const mysql = require('mysql2');
const inquirer = require('inquirer')


function startApplication(){
    inquirer.prompt([
        {
            type:"list",
            choices:["View all Departments","View all Roles","View all Employees","Update Employee","Add Department","Add Role","Add Employee","Exit Application"],
            message:"Welcome to CMS",
            name:"userSelection"
        }
    ]).then(userInput => {

        switch(userInput.userSelection){
            case "View all Departments":
                viewDepartment();
                break;
            case "View all Roles":
                viewRole();
                break;
            case "View all Employees":
                viewEmployee();
                break;
            case "Update Employee":
                    updateEmployee();
                    break;
            case "Add Department":
                        addDepartment();
                        break;
                        case "Add Role":
                            addRole();
                            break;
                            case "Add Employee":
                                addEmployee();
                                break;
        }
    })
}
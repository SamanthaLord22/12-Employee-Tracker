
const mysql = require('mysql2');
const inquirer = require('inquirer')
require("dotenv").config()
require("console.table")

const connection = mysql.createConnection({
    host:"localhost",
    user:process.env.DB_UserName,
    password:process.env.DB_Password,
    database:process.env.DB_Name,
})
connection.connect(function(err){
    if(err)throw err;
    console.log("db connected");
    startApplication()
})
function startApplication() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View All Employees and Managers","View all Departments", "View all Roles", "View all Employees", "Update Employee", "Add Department", "Add Role", "Add Employee", "Exit Application"],
            message: "Welcome to CMS",
            name: "userSelection"
        }
    ]).then(userInput => {

        switch (userInput.userSelection) {
            case "View All Employees and Managers":
                viewAll();
                break;
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
            default:
                connection.end();
                process.exit(0);
        }
    })
}
function viewAll(){
    connection.query(`select d.department_name,r.job_title,r.job_salary,
    CONCAT(e.first_name,' ',e.last_name) AS 'Employee Name',CONCAT(m.first_name,' ',m.last_name) AS 'Manager Name'
    from employee_data e 
    left join roles r on e.role_id = r.id
    left join departments d on d.id = r.department_id
    left join employee_data m on e.manager_id = m.id;`,function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
}

function viewDepartment(){
    connection.query("select * from departments;",function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
}
function viewRole(){
    connection.query("select * from roles;",function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
}
function viewEmployee(){
    connection.query("select * from employee_data;",function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
}
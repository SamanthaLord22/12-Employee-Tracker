
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
function addDepartment(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter department name",
            name:'department_name'
        }
    ]).then( response => {
    connection.query(`INSERT INTO departments (department_name) VALUES (?);`,
    response.department_name,function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
})
}
function addRole(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter job title",
            name:'job_title'
        },
        {
            type:"input",
            message:"Enter job salary",
            name:'job_salary'
        },
        {
            type:"rawlist",
            message:"Enter department id",
            name:'department_id',
            choices:[
                {name:"IT",value:1},
                {name:"Production",value:2},
                {name:"Design",value:3},
                {name:"Sales",value:4},
                {name:"Marketing",value:9},
            ]
        },

    ]).then( response => {
    connection.query(`INSERT INTO roles ( job_title, job_salary,department_id)   VALUES (?,?,?);`,
    [response.job_title, response.job_salary, response.department_id], function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
})
}
function addEmployee(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter first name",
            name:'first_name'
        },
        {
            type:"input",
            message:"Enter last name",
            name:'last_name'
        },
        {
            type:"rawlist",
            message:"Enter manager id",
            name:'manager_id',
            choices:[
                {name:"Samantha Lord",value:2},
                {name:"John Doe",value:1},
                {name:"Jane Park",value:3},
                {name:"Jim Peters",value:4}
            ]
        },
        {
            type:"rawlist",
            message:"Enter role id",
            name:'role_id',
            choices:[
                {name:"IT Manager",value:1},
                {name:"FrontEnd developer",value:2},
                {name:"ackEnd Engineer",value:3},
                {name:"BackEnd developer",value:4},
                {name:"Producer Executive",value:5},
                {name:"Design Executive",value:6},
                {name:"Sale Executive",value:7},
                {name:"Jr Designer",value:8}
            ]
        }

    ]).then( response => {
    connection.query(`INSERT INTO employee_data
    (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
    [response.first_name, response.last_name, response.role_id, response.manager_id], function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
})
}
function updateEmployee(){
    inquirer.prompt([
       
        {
            type:"rawlist",
            message:"Enter employee id",
            name:'employee_id',
            choices:[
                {name:"John Doe",value:1},
                {name:"Samantha Lord",value:2},
                {name:"Jane Park",value:3},
                {name:"Jim Peters",value:4},
                {name:"Ellen James",value:5},
                {name:"Adele Jones",value:6},
                {name:"Steve Adams",value:7},
                {name:"Jane Peters",value:8}

            ]
        },
        {
            type:"rawlist",
            message:"Enter role id",
            name:'role_id',
            choices:[
                {name:"IT Manager",value:1},
                {name:"FrontEnd developer",value:2},
                {name:"ackEnd Engineer",value:3},
                {name:"BackEnd developer",value:4},
                {name:"Producer Executive",value:5},
                {name:"Design Executive",value:6},
                {name:"Sale Executive",value:7},
                {name:"Jr Designer",value:8}
            ]
        }

    ]).then( response => {
    connection.query(`update employee_data set role_id = ? where id=?;`,
    [response.role_id, response.employee_id], function(err,data){
        if(err) throw err;
        console.table(data);
        startApplication();
    })
})
}
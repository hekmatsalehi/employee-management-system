
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
    console.log(`Connected to the employees_db database.`)  
);



const toDoPrompt =  [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'toDo',
        choices:[ 'View All Department',
                  'View All Role',
                  'View All Employees',
                  'Add Department',
                  'Add Role',
                  'Add an Employee',
                  'Update Employee Role',
                  'Quit' 
                ]
    }
]

const addDepartmentPrompt = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName', 
    }
]

const addRolePrompt = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'roleName', 
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'roleSalary', 
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'deptChoice',
        choices:['Managment', 'Web Development', 'Data Science', 'Cyber Security', 'Finance', 'Human Resource']
    },
    {
        type: 'list',
        message: 'Choose the department Id!\nManagement = 1\nWeb Development = 2\nData Science = 3\nCyber Security = 4\nFinance = 5\nHuman Resource = 6',                                  
        name: 'deptIdChoice',
        choices:['1', '2', '3', '4', '5', '6']
    },

]

const addEmployeePrompt = [
    {
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'firstName', 
    },
    {
        type: 'input',
        message: 'What is the employee\'s last name?',
        name: 'lastName', 
    },
    {
        type: 'list',
        message: 'What is the employee\'s role?',
        name: 'employeeRoleChoice',
        choices:['Manager', 'Software Developer', 'Data Scientist', 'Security Engineer', 'Finance Manager', 'HR Manager']
    },
    {
        type: 'list',
        message: 'Who is the employee\'s manager?',
        name: 'employeeManagerChoice',
        choices:['None','Zamir Bena']
    },
]

const updateEmpRole = [
    {
        type: 'list',
        message: 'Which employee\'s role would you like to update?',
        name: 'updateEmpRoleChoice',
        choices:['None', 'Zamir Bena','Ahmad Shah','Wahid Fana', 'Tom Sharma', 'Sara Ali', 'Virat Sharma', 'Ashraf Perwiz']
    },
    {
        type: 'list',
        message: 'Choose the employee\'s new role!',
        name: 'newRole',
        choices:['Manager', 'Software Developer', 'Data Scientist', 'Security Engineer', 'Finance Manager', 'HR Manager']
    }
]



const renderTodoPrompt =  () => {
inquirer
    .prompt(toDoPrompt)
    .then( (choice) => {
        if(choice.toDo == 'View All Department'){
            db.query('SELECT * FROM department', (err, resluts) => {
            if (err) throw err;
            console.table(resluts);
            renderTodoPrompt();
            });    
        }
        if (choice.toDo == 'View All Role') {
            db.query(`SELECT role.id AS id, title,  department_name, salary 
            FROM role LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee ON role.id = employee.role_id`,
            (err, resluts) => {
            if (err) throw err;
            console.table(resluts);
            renderTodoPrompt();
            });
        }
            
        if (choice.toDo == 'View All Employees') {
            db.query(`SELECT role.id, e.first_name, e.last_name,
            role.title, d.department_name, role.salary,
            CONCAT(em.first_name, ' ' , em.last_name) AS 'manager' 
            FROM employee e
            JOIN role on e.role_id = role.id
            JOIN department d on role.department_id = d.id
            LEFT JOIN employee em on e.manager_id = em.id;`, (err, resluts) => {
            if (err) throw err;
            console.table(resluts);
            renderTodoPrompt();
            });
        }
        if (choice.toDo == 'Add Department'){
            renderAddDeptPrompt();
        }

        if (choice.toDo == 'Add Role'){
            renderAddRolePrompt();
            
        }
        if (choice.toDo == 'Add an Employee'){
            renderAddEmployeePrompt();
        }

        if (choice.toDo == 'Update Employee Role'){
            renderUpdatEmpPrompt();
        }

        if (choice.toDo == 'Quit'){
            db.end()
            console.log('Good Bye!')
        }
    })
  
}

// Prompt the user to enter department's name then save it to the department table
const renderAddDeptPrompt = () => {
    inquirer
    .prompt(addDepartmentPrompt)
        .then((userInput) => {
        if (userInput.departmentName) {
            const sql = `INSERT INTO department (department_name)
                         VALUES (?)`
            db.query(sql,userInput.departmentName , (err, resluts) => {
            if (err) throw err;
            })
            console.log("Department is added to the database!")
        } else{
            console.log("No department was entered!")
        }
        renderTodoPrompt();
        })    
}



const renderAddRolePrompt = () => {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err
    inquirer.prompt(addRolePrompt)
    .then((userInput) => {
        const department_id = userInput.deptIdChoice
        if (userInput.roleName) {
            const sql = `INSERT INTO role (title, salary, department_id)
            Value(?, ?, ?)`
            const prams = [userInput.roleName, userInput.roleSalary, department_id] 
            db.query(sql,prams , (err, resluts) => {
            if (err) throw err;
            })
            console.log("Role is added to the database!")
        } else{
            console.log("No Role was entered!")
        }
        renderTodoPrompt();
        })
    })    
}



const renderAddEmployeePrompt = () => {
   
    inquirer.prompt(addEmployeePrompt)
    .then((userInput) => {

        if (userInput.firstName) {
            const sql = `INSERT INTO employee (first_name, last_name)
            Value(?, ?)`
            const prams = [userInput.firstName, userInput.lastName] 
            db.query(sql,prams , (err, resluts) => {
            if (err) throw err;
            })
            console.log("Employee is added to the database!")

        } else{
            console.log("No employee was entered!")
        }
        renderTodoPrompt();
        })
       
}

const renderUpdatEmpPrompt = () => {
   
    inquirer.prompt(updateEmpRole)
    .then((userInput) => {

        if (userInput.updateEmpRoleChoice !== 'None') {
           
            console.log("Employee Role has been updated!")

        } else {
            console.log("No employee was selected!")
        }
        renderTodoPrompt();
        })
       
}

renderTodoPrompt()

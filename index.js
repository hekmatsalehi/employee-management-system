// When View All Department is selected
    // Show table with Dept name and Dept ids
// When View All Role is selected
    // Show table with job title, role id, 
    // the department that role belongs to, 
    // and the salary for that role
// When View All Employees is selected
    // Show table with employee data, including employee ids,
    // first names, last names, job titles, departments, 
    // salaries, and managers that the employees report to
// When Add Department is selected
    // Prompt for name of the department and
    // Add that department to the database

// When Add Role is Selected
    // Prompt to enter the name, salary,
    // and department for the role
    // and Add that role to database

// When Add an Employee is selected
    // Prompt to enter employee's first name,
    // last name, role, and manager and 
    // add that employee to the database
// When Update Employee Role is selected
    // Prompt to select an employee to update
    // and update their new role and 
    // add this information to the database



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
        choices:['Web Development', 'Data Science', 'Cyber Security', 'Finance', 'Human Resource']
    }
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
        choices:['Software Developer', 'Data Scientist', 'Security Engineer', 'Finance Manager', 'HR Manager']
    },
    {
        type: 'list',
        message: 'Who is the employee\'s manager?',
        name: 'employeeManagerChoice',
        choices:['None','Younus Khan', 'Mike Sha', 'Bob Walmer', 'Wasim Vira', 'Merry Smith']
    },
]

const updateEmpRole = [
    {
        type: 'list',
        message: 'Which employee\'s role would you like to update?',
        name: 'updateEmpRoleChoice',
        choices:['Ahmad Shah','Wahid Fana', 'Tom Sharma', 'Sara Ali', 'Virat Sharma', 'Ashraf Perwiz']
    },
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
        if (choice.toDo == 'View All Role'){
            db.query(`SELECT title, role_id, department_name, salary 
            FROM role JOIN department ON role.department_id = department.id
            JOIN employee ON role.id = employee.role_id`, (err, resluts) => {
            if (err) throw err;
            console.table(resluts);
            renderTodoPrompt();
            });
        }
            
        if (choice.toDo == 'View All Employees'){
            // Note: Add the manager's name from the Terminal
            db.query(`SELECT role.id, first_name, 
            last_name, title, department_name, salary
            FROM role JOIN department ON role.department_id = department.id
            JOIN employee ON role.id = employee.role_id`, (err, resluts) => {
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
    inquirer
    .prompt(addRolePrompt)
        .then((userInput) => {
        if (userInput.roleName) {
            const sql = `INSERT INTO role (title, salary)
            Value(?,?)`
            const prams = [userInput.roleName, userInput.roleSalary] 
            db.query(sql,prams , (err, resluts) => {
            if (err) throw err;
            })
            console.log("Role is added to the database!")

        } else{
            console.log("No Role was entered!")
        }
        renderTodoPrompt();
        })    
}


renderTodoPrompt()

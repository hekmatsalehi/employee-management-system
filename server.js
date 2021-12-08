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
    // this information in the database



const inquirer = require('inquirer');


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
    // Run the toDo prompt again
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
    // Run the toDo prompt again
]

const updateEmpRole = [
    {
        type: 'list',
        message: 'Which employee\'s role would you like to update?',
        name: 'updateEmpRoleChoice',
        choices:['Ahmad Shah','Wahid Fana', 'Tom Sharma', 'Sara Ali', 'Virat Sharma', 'Ashraf Perwiz']
    },
    // Run the toDo prompt again
]





inquirer
  .prompt(updateEmpRole)
  .then((answers) => {
      console.log(answers)
  })
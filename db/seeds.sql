INSERT INTO department (department_name)
VALUES ('Managment'),
       ('Web Development'),
       ('Data Science'),
       ('Cyber Security'),
       ('Finance'),
       ('Human Resource');
       


INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 80000, 1),
       ('Software Developer', 90000, 2),
       ('Data Scientist', 70000, 3),
       ('Security Engineer', 85000, 4),
       ('Finance Manager', 70000, 5),
       ('HR Manager', 50000, 6);
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Zamir', 'Bena', 1, NULL),
       ('Ahmad', 'Shah', 2, 1),
       ('Wahid', 'Fana', 3, 1),
       ('Tom', 'Sharma', 4, 1),
       ('Sara', 'Ali', 5, 1),
       ('Ashraf', 'Perwiz', 6, 1);
       

INSERT INTO department (department_name)
VALUES ('Web Development'),
       ('Data Science'),
       ('Cyber Security'),
       ('Finance'),
       ('Human Resource');


INSERT INTO role (title, salary, department_id)
VALUES ('Software Developer', 90000, 1),
       ('Data Scientist', 70000, 2),
       ('Security Engineer', 85000, 3),
       ('Finance Manager', 70000, 4),
       ('HR Manager', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ahmad', 'Shah', 1, NUlL),
       ('Wahid', 'Fana', 2, NULL),
       ('Tom', 'Sharma', 3, 1),
       ('Sara', 'Ali', 4, 2),
       ('Ashraf', 'Perwiz', 5, 1);



INSERT INTO department (name)
VALUES ("Cyber Security"),
       ("UI/UX"),
       ("Web Design"),
       ("Data Science"),
       ("Human Resources");


INSERT INTO role (title, salary, department_id)
VALUES ("Cyber Engineer", 9000.00, 2),
       ("Designer", 70000.00, 1),
       ("Developer", 85000.00, 3),
       ("Scientest", 70000.00, 4),
       ("HR Manager", 50000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Younus", "Khan", 1, 5),
       ("Alex", "Sha", 2, 4),
       ("Jhon", "Rambo", 3, 3),
       ("Kapal", "Sharma", 4, 2),
       ("Anil", "Silva", 5, 1);



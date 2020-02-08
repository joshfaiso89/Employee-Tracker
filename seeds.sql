INSERT INTO department(dep_names)
VALUES
('SALES'),
('ENGINEERING'),
('FINANCE'),
('HUMAN RESOURCES');

INSERT INTO roles(title, salary, department_id)
VALUES
('Sales Manager', 120000, 1),
('Salesperson', 75000, 1),
('Software Engineer', 100000, 2),
('Senior Software Engineer', 120000, 2),
('Accountant', 90000, 3),
('Junior Accoutant', 80000, 3),
('Senior HR', 60000, 4),
('HR assistant', 45000, 4);

INSERT INTO employee(first_name, last_name, roles_id)
VALUES
('Arthur', 'Decaprio', 1),
('Brad', 'Chadwick', 1),
('Anthony', 'Tarintino', 2),
('Joe', 'Calvin', 2),
('Lisa', 'Ling', 3),
('Brittany', 'Telfer', 3),
('John', 'Anderson', 4),
('Martha', 'Stalling', 4);
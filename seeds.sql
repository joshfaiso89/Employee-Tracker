INSERT INTO department(department_name)
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

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('Arthur', 'Decaprio', 1, NULL),
('Brad', 'Chadwick', 2, 1),
('Anthony', 'Tarintino', 3, NULL),
('Joe', 'Calvin', 4, 3),
('Lisa', 'Ling', 5, NULL),
('Brittany', 'Telfer', 6, 5),
('John', 'Anderson', 7, NULL),
('Martha', 'Stalling', 8, 7);
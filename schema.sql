DROP DATABASE IF EXISTS EMS_db;

CREATE DATABASE EMS_db;

USE EMS_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAMES VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

SELECT*FROM departments;

SELECT*FROM roles;

SELECT*FROM employees;



DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;
USE departments_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name INT NOT NULL
)

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name INT,
    job_title INT,
    job_salary INT,
    FOREIGN KEY (department_name)
    REFERENCES departments(id)
    ON DELETE SET NULL
)

CREATE TABLE employee_data (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name INT NOT NULL,
    last_name INT NOT NULL,
    job_title INT,
    department_name INT,
    FOREIGN KEY (department_name)
    REFERENCES departments(id)
    ON DELETE SET NULL
)
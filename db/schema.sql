DROP DATABASE IF EXISTS employee1_db;
CREATE DATABASE employee1_db; 

\c employee_db; 

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL, 
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);
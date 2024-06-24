INSERT INTO department (name) VALUES
('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

INSERT INTO role (title, salary, department_id) 
VALUES 
('Sales Lead', 500.00, 1 ),
('Lead Engineer', 400.00, 2),
('Accountant', 300.00, 3),
('Lawyer', 200.00, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
('Mike', 'Jones', null, 1),
('James', 'Bond', 1, 2),
('Puff', 'Daddy', 1, 3),
('Serena', 'Williams', null, 4);
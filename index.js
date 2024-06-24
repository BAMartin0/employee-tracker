const { Pool } = require("pg");
const inquirer = require("inquirer");

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: "postgres",
    // TODO: Enter PostgreSQL password
    password: "root",
    host: "localhost",
    database: "employee_db",
  },
  console.log(`Connected to the movies_db database.`)
);

pool.connect();

const options = [
  {
    type: "list",
    name: "choices",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update An Employee Role",
    ],
  },
];

//Inquirer functionality
function menu() {
    inquirer.prompt(options).then(({ choices }) => {
      switch (choices) {
          case "View All Departments":
              viewDepartments()
          break;
          case "View All Roles":
              viewRoles()
          break;
          case "View All Employees":
              viewEmployees()
          break;
          case "Add A Department":
              addDepartment()
          break;
          case "Add A Role":
              addRole()
          break;
          case "Add An Employee":
              addEmployee()
          break;
          case "Update An Employee Role":
              updateEmployee()
          break;

        default:
          break;
      }
  });
}

// quit 
menu()

function viewDepartments() {
    pool.query('SELECT * FROM department', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    menu()
    });
}


function viewRoles() {
    pool.query('SELECT role.title, role.salary, department.name AS "department name" FROM role JOIN department ON department.id=role.department_id', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    menu()
    });
}


function viewEmployees() {
  const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
  
    pool.query(sql, (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    menu()
    });
}


async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the new department",
    },
  ]);
    pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *;', [answer.department], (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    menu()
    });
}


async function addRole() {
  const departments = await pool.query("SELECT id AS value, name AS name FROM department")
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What is the name of the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the new role?",
    },
    {
      type: "list",
      name: "department_id",
      choices: departments.rows,
      message: "What is the department of the new role?",
    },
  ]);
    pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;', [answer.role, answer.salary, answer.department_id], (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    menu()
    });
}


async function addEmployee() {
  const managers = await pool.query(
    "SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee"
  );
  const roles = await pool.query("SELECT id AS value, title AS name FROM role");
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the new employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the new employee?",
    },
    {
      type: "list",
      name: "manager_id",
      choices: managers.rows,
      message: "Who is the manager of the new employee?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the role of the new employee?",
      choices: roles.rows,
    },
  ]);
    pool.query(
      "INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [
        answer.first_name,
        answer.last_name,
        answer.manager_id,
        answer.role_id,
      ],
      (err, { rows }) => {
        if (err) {
          console.log(err);
        }
        console.table(rows);
        menu();
      }
    );
}


async function updateEmployee() {
  const roles = await pool.query("SELECT id AS value, title AS name FROM role");
  const employees = await pool.query(
    "SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee"
  );
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select the employee you would like to update.",
      choices: employees.rows
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the new role for the selected employee.",
      choices: roles.rows
    },
  ]);
    pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [answer.role_id, answer.employee_id], (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    menu()
    });
};



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

        default:
          break;
      }
  });
}

function viewDepartments() {
    pool.query('SELECT * FROM department', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    });
}

menu()
function viewRoles() {
    pool.query('SELECT * FROM role', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    });
}

menu()

function viewEmployees() {
    pool.query('SELECT * FROM employee', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    });
}

menu()

function viewDepartments() {
    pool.query('SELECT * FROM department', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    });
}

menu()

function viewDepartments() {
    pool.query('SELECT * FROM department', (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows)
    });
}

menu()

function () {
    
}
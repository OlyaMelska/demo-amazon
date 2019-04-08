let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["View Product Sales by Department", "Create New Department"],
      name: "choice"
    }
  ])
  .then(answer => {
    switch (answer.choice) {
      case "Create New Department":
        createNewDept();
        break;
      case "View Product Sales by Department":
        viewProductsSales();
        break;
      default:
        console.log("Something went wrong");
    }
  });

let createNewDept = () => {
  console.log("Creating new department...");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new department's name",
        name: "deptName"
      },
      {
        type: "input",
        message: "Enter over head costs",
        name: "cost"
      }
    ])
    .then(answer => {
      connection.query(
        "INSERT INTO departments SET ?",
        [
          {
            department_name: answer.deptName,
            over_head_costs: answer.cost
          }
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Successfully added a new department");
        }
      );
    });
};

let viewProductsSales = () => {
  console.log("Viewing products for sale...");
  connection.query(
    "SELECT department_name, product_sales FROM products",
    (err, res) => {
      if (err) throw err;
      connection.query("SELECT * from departments", (error, detpResponse) => {
        if (res.department_name === detpResponse.department_name) {
          // connection.query
        }
      });
      console.log(res);
    }
  );
};

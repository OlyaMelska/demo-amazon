let requirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.query("SELECT * FROM products", (err, res) => {
  if (err) throw err;
  res.forEach(element => {
    console.log(
      element.item_id + ") " + element.product_name + " $" + element.price
    );
  });
});

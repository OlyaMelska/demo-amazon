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
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ],
      name: "choice"
    }
  ])
  .then(answer => {
    switch (answer.choice) {
      case "View Products for Sale":
        console.log("Viewing products...");
        viewProducts();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Add to Inventory":
        addToInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
      default:
        console.log("something went wrong");
    }
  });

let viewProducts = () => {
  connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    (err, res) => {
      res.forEach(element => {
        console.log(
          element.item_id +
            ") " +
            element.product_name +
            " $" +
            element.price +
            " | " +
            element.stock_quantity +
            " items"
        );
      });
    }
  );
};

let viewLowInventory = () => {
  console.log("Viewing low inventory...");
  connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    (err, res) => {
      res.forEach(element => {
        if (element.stock_quantity < 5) {
          console.log(
            element.item_id +
              ") " +
              element.product_name +
              " $" +
              element.price +
              " | " +
              element.stock_quantity +
              " items"
          );
        }
      });
    }
  );
};

let addToInventory = () => {
  console.log("Adding to inventory...");
  viewProducts();
  setTimeout(() => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter an ID of the item you want to add",
          name: "id"
        },
        {
          tyoe: "input",
          message: "Enter quantity: ",
          name: "qty"
        }
      ])
      .then(answer => {
        connection.query(
          "SELECT item_id, stock_quantity FROM products",
          (err, res) => {
            res.forEach(element => {
              if (element.item_id === parseInt(answer.id)) {
                let newQty = element.stock_quantity + parseInt(answer.qty);
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: newQty
                    },
                    {
                      item_id: answer.id
                    }
                  ],
                  function(err, result) {
                    if (err) throw err;
                    console.log(
                      `Updated ${result.changedRows} item\nID: ${
                        element.item_id
                      } | new quantity: ${newQty}`
                    );
                    // viewProducts();
                  }
                );
              }
            });
          }
        );
      });
  }, 100);
};

let addProduct = () => {
  console.log("Adding new product...");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Name of the product",
        name: "name"
      },
      {
        type: "list",
        message: "Choose the department",
        choices: ["iHome", "Brookstone", "RBX", "Add new department"],
        name: "department"
      },
      {
        type: "input",
        message: "Enter price",
        name: "price"
      },
      {
        type: "input",
        message: "Enter quantity",
        name: "qty"
      }
    ])
    .then(answers => {
      connection.query(
        "INSERT INTO products SET ?",
        [
          {
            product_name: answers.name,
            department_name: answers.department,
            price: parseInt(answers.price),
            stock_quantity: parseInt(answers.qty)
          }
        ],
        (err, res) => {
          if (err) throw err;
          viewProducts();
        }
      );
    });
};

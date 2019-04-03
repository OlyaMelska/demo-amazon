let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

let displayData = () => {
  connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    (err, res) => {
      if (err) throw err;
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

displayData();
setTimeout(() => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID of an item that you want to buy",
        name: "id"
      },
      {
        type: "input",
        message: "How many items do you want to buy?",
        name: "quantity"
      }
    ])
    .then(response => {
      buyItem(response.id, response.quantity);
    });
}, 1000);

let buyItem = (id, qty) => {
  connection.query(
    "SELECT item_id, stock_quantity, product_name, price FROM products",
    (err, res) => {
      if (err) throw err;
      res.forEach(element => {
        if (parseInt(id) === element.item_id) {
          if (parseInt(qty) < element.stock_quantity) {
            let newQty = element.stock_quantity - qty;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQty
                },
                {
                  item_id: id
                }
              ],
              function(err, res) {
                if (err) throw err;
                console.log(`Updated ${res.changedRows} item`);
                displayData();
              }
            );

            // connection.query("UPDATE products SET ? WHERE ?", [
            //   {
            //     stock_quantity: newQty
            //   },
            //   {
            //     item_id: parseInt(id)
            //   }
            // ]),
            //   (err, res) => {
            //     if (err) throw err;
            //     console.log("Successfully updated DataBase!\n" + res);
            //   };
            console.log(
              `You've successfully purchased this item for $${qty *
                element.price}`
            );
          } else {
            console.log("Insufficient quantity!");
          }
        }
      });
    }
  );
};

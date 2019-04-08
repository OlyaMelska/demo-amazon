CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INT
    auto_increment NOT NULL PRIMARY KEY,
	product_name VARCHAR
    (40) NOT NULL,
	department_name VARCHAR
    (40) NOT NULL,
    price FLOAT,
    product_sales FLOAT,
    stock_quantity INT
);

    CREATE TABLE departments
    (
        department_id INT
        auto_increment NOT NULL PRIMARY KEY,
    department_name VARCHAR
        (40) NOT NULL,
    over_head_costs FLOAT
);

        SELECT *
        FROM departments;

        SELECT *
        FROM products;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT auto_increment NOT NULL PRIMARY KEY,
	product_name VARCHAR(40) NOT NULL,
	department_name VARCHAR(40) NOT NULL,
    price FLOAT,
    stock_quantity INT
);
SELECT * FROM products;
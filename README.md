# Customer Management System
Create Customers and store there information

This project is created to add customers and see data is generated properly after distributing number of bills amoung all customers.
Data for customer collection is created using UI and data for bills collection is created using jsongeneraor. After adding each customer bills are distributed rondamly among them.

Records can be filterd based on different fields of customers collection. Pagination is implimented using url querystrings.

To compile this project on local machine.

1. Install node, mongodb.
2. Go to root directory and type npm install. It will automatically install all dependency after digging into package.json.
3. Change port to your prefered port in server.js file.
4. Change mongodb uri to your installed mogodb uri in /database/db.js.

Demo of this project is availiable at https://customermanagement.herokuapp.com/

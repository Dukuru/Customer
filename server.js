//loads modules.
var express = require('express');
var bodyParser = require('body-parser');
var database = require('./app/database/db.js');
var customer = require('./app/manager/customermanager.js')
var app = express();
//use middleware.
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));
//routing logic.
app.post("/addcustomer",customer.addCustomer);
app.post("/generatebills",customer.generateBills);
app.post("/deletecustomer",customer.deleteCustomer);
app.get("/customerdetails",customer.getCustomerDetails);
app.get("/",customer.init);
database.init(function(err,results){
	if(err)
		{
			console.error("Error Occured : "+err.message);
			console.error(err);
		}
	else
		{
			app.listen(process.env.PORT||3000);
		}
});

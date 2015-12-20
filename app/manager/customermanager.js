var query = require('../database/query.js');
var customer = require('./customer.js');
var bills = require('./bills.js');
exports.init = function(req,res){
	res.sendFile('html/customer.html',{root:__dirname+'../../../static'}); //send initial file.
};
exports.addCustomer = function(req,res){
	if(req.body)
		{
			var data = customer.Customer(req.body.data);
			if(data === false)
				{
					res.writeHead(400,{ "Content-Type" : "application/json" });
					res.end(JSON.stringify({ error: 404, message: "Error in data" }));
					return;
				}
			else
				{
					if(req.body.update)
						{
							console.log(req.body);
							if(!req.body.id)
								{
									res.writeHead(400,{ "Content-Type" : "application/json" });
									res.end(JSON.stringify({ error: err.code, message: "Id not specified" }));
									return;
								}
							query.updateCustomer(req.body.id,req.body.data,function(err,result){
								if(err)
								{
									res.writeHead(400,{ "Content-Type" : "application/json" });
									res.end(JSON.stringify({ error: err.code, message: err.message }));
									return;
								}
							else
								{
									res.writeHead(200,{ "Content-Type" : "application/json" });
									res.end(JSON.stringify({ error: null, message: result }));
									return;
								}
							
							});
						}
					else
						{
							query.addCustomer(data, function(err,result){
							if(err)
								{
									res.writeHead(400,{ "Content-Type" : "application/json" });
									res.end(JSON.stringify({ error: err.code, message: err.message }));
									return;
								}
							else
								{
									bills.generate(function(){});
									res.writeHead(200,{ "Content-Type" : "application/json" });
									res.end(JSON.stringify({ error: null, message: "Succfully Added" }));
									return;
								}
							});
						}
				}
		}
};
exports.generateBills = function(req,res){
	bills.generate(function(err,data){
		if(err)
			{
				res.writeHead(400,{ "Content-Type" : "application/json" });
				res.end(JSON.stringify({ error: err.code, message: err.message }));
				return;
			}
		else
			{
				res.writeHead(200,{ "Content-Type" : "application/json" });
				res.end(JSON.stringify({ error: null, message: "Succfully Added" }));
				return;
			}
	});
};
exports.deleteCustomer = function(req,res)
{
	if(req.body.id)
		{
			query.deleteCustomer(req.body.id,function(err){
				if(err)
					{
						res.writeHead(400,{ "Content-Type" : "application/json" });
						res.end(JSON.stringify({ error: err.code, message: err.message }));
						return;
					}
				else
					{
						res.writeHead(200,{ "Content-Type" : "application/json" });
						res.end(JSON.stringify({ error: null, message: "Succfully Deleted" }));
						return;
						
					}
			});
		}
};
exports.getCustomerDetails = function(req,res)
{
	var page = req.query.page?req.query.page:1;
	var pagesize = req.query.pagesize?req.query.pagesize:20;
	query.getCustomerDetails(page,pagesize,function(err,data){
		if(err)
		{
			res.writeHead(400,{ "Content-Type" : "application/json" });
			res.end(JSON.stringify({ error: err.code, message: err.message }));
			return;
		}
	else
		{
			res.writeHead(200,{ "Content-Type" : "application/json" });
			res.end(JSON.stringify({ error: null, data: data }));
			return;
		}
	});
};
var query = require('../database/query.js');
var customer = require('./customer.js');
var bills = require('./bills.js');
var utils = require('./utils.js');
exports.init = function(req,res){
	res.sendFile('html/customer.html',{root:__dirname+'../../../static'}); //send initial file.
};
exports.addCustomer = function(req,res){
	if(req.body)
		{
			var data = customer.Customer(req.body.data);
			if(data === false)
				{
					utils.failure(res,{"code":"400","Message":"Data Cannot be parsed"});
					return;
				}
			else
				{
					if(req.body.update)
						{
							if(!req.body.id)
								{
									utils.failure(res,{"code":"400","Message":"Id not specified"});
									return;
								}
							query.updateCustomer(req.body.id,req.body.data,function(err,result){
								if(err)
								{
									utils.failure(res,err);
									return;
								}
							else
								{
									utils.success(res,result);
									return;
								}
							
							});
						}
					else
						{
							query.addCustomer(data, function(err,result){
							if(err)
								{
									utils.failure(res,err);
									return;
								}
							else
								{
									bills.generate(function(){});
									utils.success(res,result);
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
				utils.failure(res,err);
				return;
			}
		else
			{
				utils.success(res,{message: "Succfully Added" });
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
						utils.failure(res,err,err.message);
						return;
					}
				else
					{
						utils.success(res,{message: "Succfully Deleted" });
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
			utils.failure(res,err,err.message);
			return;
		}
	else
		{
			utils.success(res,data);
			return;
		}
	});
};
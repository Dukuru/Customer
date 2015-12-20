db = require('./db.js'); // load module db
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
exports.addCustomer = function(customer,cb)
{
	db.customers.insert(customer,{w:1,safe:true},function(err){
		if(err)
			{
				cb(err);
				return;
			}
		else
			{
				cb(null);
				return;
			}
	});
}
exports.updateCustomer = function(id,customer,cb)
{
	db.customers.replaceOne({"_id":new ObjectId(id)},customer,function(err,result){
		if(err)
			{
				cb(err);
				return;
			}
		else
			{
				cb(null,result);
				return;
			}
	});
}
exports.getCustomerIds = function(cb)
{
	db.customers.find({},{_id:true}).toArray(cb);
}
exports.insertUpdateBillsData = function(bills,callback)
{
	async.waterfall([
        function (cb) {
          db.bills.remove({});
			cb();
        },
        function (cb) {
		  db.bills.insert(bills);
			cb(null);
        }
    ], callback);
};
exports.deleteCustomer = function(id,cb)
{
	db.customers.remove({"_id":new ObjectId(id)});
	cb(null);
};
exports.getCustomerDetails = function(page,pagesize,callback)
{
	var customersarray = [];
	async.waterfall([
		function(cb)
		{
			db.customers.find({}).skip((page-1)*pagesize).limit(parseInt(pagesize)).toArray(cb);
		},
		function(customers,cb)
		{
			async.eachSeries(customers,function(customer,cb1){
				var obj={};
				async.waterfall([
					function(cb2)
					{
						obj.id = customer._id;
						obj.name = customer.name;
						obj.mobile = customer.mobile;
						obj.phone = customer.phone;
						obj.email = customer.email;
						obj.dob = customer.dob;
						obj.address = customer.address;
						db.bills.find({"customerid":customer._id}).count(cb2);
					},
					function(count,cb2)
					{
						obj.noofbills = count;
						db.bills.find({"customerid":customer._id}).toArray(cb2);					
					},
					function(bills,cb2)
					{
						var sum=0;
						for(i=0;i<bills.length;i++)
						{
							for(j=0;j<bills[i].Items.length;j++)
							{
								var totalsum = parseFloat(bills[i].Items[j].quantity)*parseFloat(bills[i].Items[j].rate);
								var deductions = totalsum - parseFloat(bills[i].Discount)*totalsum/100 - parseFloat(bills[i].Tax)*totalsum/100;
								sum=sum + totalsum - deductions;
							}
						}
						obj.amount = sum;
						obj.avg = obj.amount/obj.noofbills;
						customersarray.push(obj);
						cb2(null);
					}
				],cb1);
				
			},function(err){
				if(err)
					{
						cb(err);
						return;
					}
				else
					{
						cb(null,customersarray);
					}
			});
		}
		
	],callback);
};
var query = require('../database/query.js'); // load module db
exports.generate = function(cb){
	var bills = require("../../generated.json");
	query.getCustomerIds(function(err,customerIds){
		if(err)
			{
				cb(err);
				return;
			}
			else{
				for(var i=0;i<bills.length;i++)
					{
						bills[i].customerid = customerIds[Math.floor(Math.random()*customerIds.length)]._id;
					}
				query.insertUpdateBillsData(bills,function(err){
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
	});
};
exports.failure = function(res,err){
	res.writeHead(400,{ "Content-Type" : "application/json" });
	res.end(JSON.stringify({ error: err.code, message: err }));
};
exports.success = function(res,result){
	res.writeHead(200,{ "Content-Type" : "application/json" });
	res.end(JSON.stringify({ "error":null,"data":result }));
};

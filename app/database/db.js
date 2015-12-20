//This file is used to initialize database
var mongostr = "mongodb://heroku_qgpxq9tq:8m5kbg7lj695fvvuellfjruml7@ds033875.mongolab.com:33875/heroku_qgpxq9tq";
//var url = 'mongodb://localhost:27017/Customers';
var async = require('async');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var db;
exports.init = function (callback) {
	async.waterfall([
        function (cb) {
           MongoClient.connect(mongostr, cb);
        },
        function (database, cb) {
			db = database;
            db.collection("customers", cb); //new Collection customers is created
        },
        function (customers, cb) {
            exports.customers = customers;
			db.collection("bills",cb);
		},
		function (bills,cb)
		{
			exports.bills = bills;
			 cb(null); // throw success (error null)		
		}
    ], callback);
};
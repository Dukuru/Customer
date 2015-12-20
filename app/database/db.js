//This file is used to initialize database
//var mongostr = "mongodb://heroku_dt101dbz:llj3qft7j453phljl2o39u3ren@ds059634.mongolab.com:59634/heroku_dt101dbz";
var url = 'mongodb://localhost:27017/Customers';
var async = require('async');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var db;
exports.init = function (callback) {
	async.waterfall([
        function (cb) {
           MongoClient.connect(url, cb);
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
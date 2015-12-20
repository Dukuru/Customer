//initialize customer app and configuring routes.
var customerApp = angular.module('CustomerApp',['ngRoute']).service('sharedCustomer', function () {
        var customer = {};

        return {
            getProperty: function () {
                return customer;
            },
            setProperty: function(value) {
                customer = value;
            }
        };
    });
customerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddCustomer/', {
        templateUrl: '../html/add_customer.html',
        controller: 'AddNewCustomer'
    }).
      when('/', {
        templateUrl:'html/show_details.html',
        controller: 'ShowAllCustomers'
    }).
	  when('/Customer/:id/',{
		templateUrl:'html/add_customer.html',
		controller:'UpdateCustomer'
	}).
      otherwise({
        redirectTo: '/'
      });
}]);


customerApp.controller('ShowAllCustomers',['$scope','$http','sharedCustomer', function($scope,$http,sharedCustomer) {
	$scope.page=1;
	$scope.pagesize = 20;
	$scope.canincrease = true;
	$scope.deleteCustomer = function(id)
	{
		$http.post('/deletecustomer',{"id":id}).success(function(result){
			$scope.getdata();
		}).error(function(err){
			console.log("error occured "+err );
		});
	}
	$scope.editCustomer = function(id){
		for (var i = 0; i < $scope.customers.length; i++) {
			if ($scope.customers[i].id === id) {
				sharedCustomer.setProperty($scope.customers[i]);
				break;
			}
		  }
		location.href="#/Customer/"+id;
	}
	$scope.loadpage = function(){
		if($scope.pagesize)
			{
				$scope.getdata();
			}
	}
	$scope.incrpage = function()
	{
		if($scope.canincrease)
			{
				$scope.page++;
				$scope.getdata();
			}
	}
	$scope.decpage = function()
	{
		if($scope.page -1 >0)
			{
				$scope.page--;
				$scope.getdata();
			}
	}
	$scope.getdata = function(){
		$http.get('/customerdetails?page='+$scope.page+'&pagesize='+$scope.pagesize).success(function(result){
			$scope.customers = result.data;
			if($scope.customers.length != 0 )
				{
					$scope.canincrease = true;
				}
			else
				{
					$scope.canincrease = false;
					$scope.decpage();
				}
			console.log(result.data);
		}).error(function(err){
			console.log("error occured "+err );
		});
	}
	$scope.getdata();
}]);
//controller for adding folders.
customerApp.controller('AddNewCustomer', function($scope,$http) {
	$scope.customer = {name:'',mobile:'',phone:'',email:'',dob:'',address: [{addresstype:'',flat: '', street: '', state: '', pincode: ''}]};
	$scope.Message = "Add new customer";
	$scope.addAddress = function(){
    	$scope.customer.address.push({addresstype:'',flat: '', street: '', state: '', pincode: ''});
  	}
	$scope.back=function(){
		location.href="#/";
	}
	$scope.removeAddress = function(index, customer){
    var address = $scope.customer.address[index];
   if(index>=1)
			{
      			$scope.customer.address.splice(index, 1);
    		}
  };
	$scope.save = function () {
    if ($scope.customerForm.$valid){
      	$http.post('/addcustomer',{"update":false,"data":$scope.customer}).success(function(result){
			console.log("successfully Added");
			location.href="#/ShowAllCustomers";
		}).error(function(err){
			console.log("error occured "+JSON.stringify(err) );
		});
    }
  }
    
});
customerApp.controller('UpdateCustomer',['$scope','$routeParams','$http','sharedCustomer', function($scope,$routeparams,$http,sharedCustomer) {
	console.log(sharedCustomer.getProperty());
	$scope.customer = sharedCustomer.getProperty();
	console.log("hello");
	if(Object.keys($scope.customer).length===0)
	{
		location.href="#/"
	}
	$scope.Message = "Update" + $scope.customer.name;
	$scope.addAddress = function(){
    	$scope.customer.address.push({addresstype:'',flat: '', street: '', state: '', pincode: ''});
  	}
	$scope.back=function(){
		location.href="#/";
	};
	$scope.save = function () {
    if ($scope.customerForm.$valid){
      	$http.post('/addcustomer',{"update":true,"id":$routeparams.id,"data":$scope.customer}).success(function(result){
			location.href="#/ShowAllCustomers";		
		}).error(function(err){
			console.log("error occured "+JSON.stringify(err) );
		});
    }
  };
	$scope.removeAddress = function(index, customer){
    var address = $scope.customer.address[index];
		if(index>=1)
			{
      			$scope.customer.address.splice(index, 1);
    		}
  };
    
}]);
 
//controller to display folders . 
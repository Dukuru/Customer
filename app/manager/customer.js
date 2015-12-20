function Address(obj)
{
	this.addresstype = obj.addresstype;
	this.flat = obj.flat;
	this.street = obj.street;
	this.state = obj.state;
	this.pincode = obj.pincode;
}
Address.prototype.verify = function(){
	if(!this.addresstype || !this.flat|| !this.street || !this.state || !this.pincode)
		{
			return false;
		}
	return true;
}
function Customer(obj)
{
	this.name = obj.name;
	this.mobile = obj.mobile;
	this.phone = obj.phone;
	this.address = [];
	for(var ad in obj.address)
		{
					this.address.push(new Address(obj.address[ad]))
		}
	this.dob = obj.dob;
	this.email = obj.email;
}

Customer.prototype.verify = function(){
	if(!this.name|| !this.mobile || !this.phone || !this.dob || !this.email || !this.address)
		{
			return false;
		}
	if('/^[1-9]{1}[0-9]{9}$/'.test(this.mobile))
		{
			return false;
		}
	if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)){
		return false;
	}
	for(var ad in this.address)
		{
			if(!this.address[ad].verify())
				{
					return false;
				}
		}
	return true;
}
exports.Customer = function(obj){
	var customer = new Customer(obj);
	if(customer.verify()){
		return customer;	
	}
	return false;
};
$(document).ready(function(){
	//instantiate a new city 
	var city1 = new city("Brooklyn", "New York");

	console.log(city1.name);

	document.getElementById("cityname").innerHTML = city1.name;
	console.log(city1.state);
});

//city class
var city = function(name, state){
	//having the property name
	this.name = name;
	this.state = state;
	console.log("City instantiated!");
};




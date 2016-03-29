$(document).ready(function(){
	var city1 = new city("Brooklyn");

	console.log(city1.name);

	//document.getElementById("cityname").value = city1.name;
	document.getElementById("cityname").innerHTML = city1.name;
});

var city = function(name){
	this.name = name;
	console.log("City instantiated!");
};




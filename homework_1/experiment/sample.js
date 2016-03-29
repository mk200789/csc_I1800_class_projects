$(document).ready(function(){
	//instantiate a new city 
	var city1 = new city("Brooklyn", "New York");

	console.log(city1.name);

	document.getElementById("cityname").innerHTML = city1.name;
	console.log(city1.state);
	draw_grid();
});

//city class
var city = function(name, state){
	//having the property name
	this.name = name;
	this.state = state;
	console.log("City instantiated!");
};


function draw_grid(){
	console.log("GRID!");
	//create a new canvas
	var canvas = document.getElementById("grid");
	//set 2d grid
	var context = canvas.getContext("2d");
	
	//color for fill
	context.fillStyle = "red";

	//location and size of the rectangle  
	context.fillRect(10, 10, 100, 100);

}



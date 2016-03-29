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

	var gridHeight = 100;
	var gridWidth = 100;

	context.beginPath();
	
	context.moveTo(0,0);
	context.lineTo(100, 0);

	context.moveTo(100, 0);
	context.lineTo(100, 100);

	context.moveTo(0, 0);
	context.lineTo(0, 100);

	context.moveTo(0, 100);
	context.lineTo(100, 100);

	context.strokeStyle = "green";
	context.stroke();
	
	//color for fill
	//context.fillStyle = "red";

	//location and size of the rectangle  
	//context.fillRect(10, 10, gridWidth, gridHeight);

}



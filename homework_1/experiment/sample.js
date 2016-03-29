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

	var cell = 50;

	//holds value of previous x, and y value for drawing lines
	var prevx = 0;
	var prevy = 0;
	context.beginPath();

	for (var row = 0; row < 500; row += cell){
		for (var i = 0; i <500; i+=cell){
			context.moveTo(prevx, row);
			context.lineTo(i, row);
			prevx = i;
			for(var j = 0; j<500; j+=cell){
				context.moveTo(i, prevy);
				context.lineTo(i, j);
				prevy = j;
			}
		}
	}

	context.strokeStyle = "green";
	context.stroke();
/*
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
*/	
	//color for fill
	//context.fillStyle = "red";

	//location and size of the rectangle  
	//context.fillRect(10, 10, gridWidth, gridHeight);

}



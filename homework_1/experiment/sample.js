$(document).ready(function(){
	//instantiate a new city taking in city, x, and y value
	var city = new City("Brooklyn", 100, 100);

	console.log(city.name);

	document.getElementById("cityname").innerHTML = city.name;

	city.addCity("Queens", 200, 100);

	console.log(city.city_list);

	draw_grid();
});


class City {
	constructor(name, x_coord, y_coord){
		this.city_list = [{name, x_coord, y_coord}];

		this.name = name;
		this.x = x_coord;
		this.y = y_coord;

		console.log("City instantiated!");
	}

	addCity(name, x_coord, y_coord){
		this.city_list.push({name, x_coord, y_coord});
	}
}


function draw_grid(){
	console.log("GRID!");
	//create a new canvas
	var canvas = document.getElementById("grid");
	//set 2d grid
	var context = canvas.getContext("2d");

	var cell = 10;

	//holds value of previous x, and y value for drawing lines
	var prevx = 0;
	var prevy = 0;
	context.beginPath();
	context.lineWidth = 1;

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

	//context.strokeStyle = "red";
	//draws a rectangle
	//context.fillRect(cell-5, cell-5, 10, 10);

	context.beginPath();
	context.strokeStyle = "red";
	//draws a rectangle
	//context.fillRect(cell-5, cell-5, 10, 10);
	//draws a circle
	context.fillStyle = "red";
	context.arc(cell, cell, 2, 0, 2 * Math.PI);
	context.fill();
	context.stroke();

}



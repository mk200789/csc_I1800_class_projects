$(document).ready(function(){
	//instantiate a new city taking in city, x, and y value
	var city = new City(100, 100, "Brooklyn");

	console.log(city.name);

	document.getElementById("cityname").innerHTML = city.name;

	draw_grid();
	city.randomPopulate();
	city.drawCity();
});


class City {
	constructor(x_coord, y_coord, name = ""){

		this.name = name;
		this.x = x_coord;
		this.y = y_coord;

		this.city_list = [{'x': this.x, 'y': this.y, 'name': this.name}];

		console.log("City instantiated!");
	}

	addCity(x_coord, y_coord, name = ""){
		//add a new city 
		this.city_list.push({'x':x_coord, 'y':y_coord, 'name':name});
	}

	randomPopulate(){
		//randomly populates 10 cities

		for (var i=0; i<10; i++){
			var x = getRandomInt(1, 490);
			var y = getRandomInt(1, 490);
			this.addCity(x, y);
		}
		console.log("finish adding 10 random cities.");
	}

	drawCity(){
		//plots the city on canvas
		var canvas = document.getElementById("grid");

		var context = canvas.getContext("2d");

		context.strokeStyle = "red";
		context.fillStyle = "red";

		for (let city of this.city_list) {
			context.beginPath();
			context.arc(city.x, city.y, 2, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}
		
	}
}

class SimulatedAnnealing {
	constructor(temp, cooling, freezing){
		this.temperature = temp;
		this.cooling = cooling;
		this.freezing = freezing;
	}
}


function draw_grid(){
	//draws the grid
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

	for (var row = 0; row < 500; row += cell){
		for (var i = 0; i < 500; i+=cell){
			context.moveTo(prevx, row);
			context.lineTo(i, row);
			prevx = i;
			for(var j = 0; j < 500; j+=cell){
				context.moveTo(i, prevy);
				context.lineTo(i, j);
				prevy = j;
			}
		}
	}
	context.strokeStyle = "green";
	context.stroke();
}


// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



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
		/*
		this.city_list = [{'x': 407, 'y': 121, 'name': ""},
						  {'x': 412, 'y': 200, 'name': ""},
						  {'x': 198, 'y': 481, 'name': ""},
						  {'x': 143, 'y': 196, 'name': ""},
						  {'x': 153, 'y': 233, 'name': ""},
						  {'x': 178, 'y': 395, 'name': ""},
						  {'x': 234, 'y': 15,  'name': ""},
						  {'x': 367, 'y': 173, 'name': ""},
						  {'x': 385, 'y': 376, 'name': ""},
						  {'x': 125, 'y': 272, 'name': ""}];
		*/
		console.log("City instantiated!");
	}

	addCity(x_coord, y_coord, name = ""){
		//add a new city 
		this.city_list.push({'x':x_coord, 'y':y_coord, 'name':name});
	}

	randomPopulate(){
		//randomly populates 10 cities

		for (var i=0; i<10; i++){
			this.addCity(getRandomInt(1, 490), getRandomInt(1, 490));
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
		this.best_cost = 0; //keeps track of the best cost
		this.best = [];
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

//Returns the distance between two points
function getDistance(p1, p2){
	return Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[0]-p2[0])*(p1[1]-p2[1]));
}


// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



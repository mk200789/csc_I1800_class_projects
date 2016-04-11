$(document).ready(function(){
	//instantiate a new city taking in city, x, and y value
	var city = new City(100, 100, "Brooklyn");

	console.log(city.name);

	document.getElementById("cityname").innerHTML = city.name;

	draw_grid();
	//city.randomPopulate();
	city.drawCity();

	var testtsa = new SimulatedAnnealing(1.0, 0.99, city.city_list);
	testtsa.start(3);
});


class City {
	constructor(x_coord, y_coord, name = ""){

		this.name = name;
		this.x = x_coord;
		this.y = y_coord;

		//this.city_list = [{'x': this.x, 'y': this.y, 'name': this.name}];
		
		this.city_list = [{'x': this.x, 'y': this.y, 'name': this.name},
						  {'x': 407, 'y': 121, 'name': ""},
						  {'x': 412, 'y': 200, 'name': ""},
						  {'x': 198, 'y': 481, 'name': ""},
						  {'x': 143, 'y': 196, 'name': ""},
						  {'x': 153, 'y': 233, 'name': ""},
						  {'x': 178, 'y': 395, 'name': ""},
						  {'x': 234, 'y': 15,  'name': ""},
						  {'x': 367, 'y': 173, 'name': ""},
						  {'x': 385, 'y': 376, 'name': ""},
						  {'x': 125, 'y': 272, 'name': ""}];
		
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
	constructor(temp, cooling, cities){
		this.temperature = temp; //initial temperature
		this.cooling = cooling;
		this.best_cost = 0; //keeps track of the best cost
		this.best = cities; //set current cities to best
		this.cities = cities;
		this.best_cost = 0;
	}

	start(count){
		//Starts SA
		this.best_cost = this.getCost(); // calculate the cost of the path and set as initial best_cost
		//loops around count times  to find optimum path
		/*
		while (this.temperature > 0.00001){
			var i = count;
			while (i > 0){
				console.log("hi");
				i--;
				
			}
			this.temperature *= this.cooling; //linear cooling
		}
		*/
	}

	neighbor(){
		//Generates and return a random neighboring solution
		var temp = [];
	}

	getCost(){
		//Returns the cost of the current path
		var cost = 0;

		for (var i=0; i<this.cities.length-1; i++){
			cost += getDistance(this.cities[i], this.cities[i+1]);
			console.log("cost between (", this.cities[i].x , this.cities[i].y, ") and (", this.cities[i+1].x , this.cities[i+1].y, ") is : ", getDistance(this.cities[i], this.cities[i+1]));
		}

		cost += getDistance(this.cities[0], this.cities[this.cities.length-1]);
		console.log("cost between (", this.cities[this.cities.length-1].x , this.cities[this.cities.length-1].y, ") and (", this.cities[0].x , this.cities[0].y, ") is : ", getDistance(this.cities[this.cities.length-1], this.cities[0]));

		return cost;
	}

	acceptanceProbability(old_cost, new_cost, curr_temp){
		//Returns a number between 0 and 1, using this we can decide whether or not
		//to jump to a new solution

		if (new_cost < old_cost){
			return 1;
		}
		return Math.exp((old_cost - new_cost)/curr_temp);
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
	return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}


// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



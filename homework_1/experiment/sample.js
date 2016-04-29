$(document).ready(function(){
	//instantiate a new city taking in city, x, and y value
	var city = new City(100, 100, "Brooklyn");

	console.log(city.name);

	document.getElementById("cityname").innerHTML = city.name;

	draw_grid();
	//city.randomPopulate();
	city.drawCity();

	var testtsa = new SimulatedAnnealing(100, 0.99, city.city_list);

	document.getElementById("start_path").onclick = function(){
		console.log("YOU CLICKED ME");
		setTimeout(function(){
			testtsa.initialRoute();
			console.log("A");
			setB();
		}, 500);
		

	}


	function setB (){
		testtsa.start();
		console.log("B");
	}

});


class City {
	constructor(x_coord, y_coord, name = ""){

		this.name = name;
		this.x = x_coord;
		this.y = y_coord;

		//this.city_list = [{'x': this.x, 'y': this.y, 'name': this.name}];
		
		//151 cities hard coded
		/*
		this.city_list = [{'x': this.x, 'y': this.y, 'name': this.name},
						  {'x': 325, 'y': 298, 'name': ""},
						  {'x': 231, 'y': 110, 'name': ""},
						  {'x': 485, 'y': 226, 'name': ""},
						  {'x': 176, 'y': 424, 'name': ""},
						  {'x': 95,  'y': 98, 'name': ""},
						  {'x': 477, 'y': 361, 'name': ""},
						  {'x': 490, 'y': 120,  'name': ""},
						  {'x': 397, 'y': 414, 'name': ""},
						  {'x': 408, 'y': 73, 'name': ""},
						  {'x': 439, 'y': 218, 'name': ""},
						  {'x': 139, 'y': 33, 'name': ""},
						  {'x': 389, 'y': 314, 'name': ""},
						  {'x': 44,  'y': 204, 'name': ""},
						  {'x': 222, 'y': 207, 'name': ""},
						  {'x': 298, 'y': 358, 'name': ""},
						  {'x': 134, 'y': 481, 'name': ""},
						  {'x': 458, 'y': 416, 'name': ""},
						  {'x': 427, 'y': 264, 'name': ""},
						  {'x': 414, 'y': 201, 'name': ""},
						  {'x': 256, 'y': 202, 'name': ""},
						  {'x': 183, 'y': 462, 'name': ""},
						  {'x': 69,  'y': 463, 'name': ""},
						  {'x': 346, 'y': 446, 'name': ""},
						  {'x': 285, 'y': 81, 'name': ""},
						  {'x': 478, 'y': 365, 'name': ""},
						  {'x': 157, 'y': 361, 'name': ""},
						  {'x': 211, 'y': 142, 'name': ""},
						  {'x': 122, 'y': 184, 'name': ""},
						  {'x': 19,  'y': 275, 'name': ""},
						  {'x': 90,  'y': 205, 'name': ""},
						  {'x': 464, 'y': 12, 'name': ""},
						  {'x': 33,  'y': 269, 'name': ""},
						  {'x': 355, 'y': 442, 'name': ""},
						  {'x': 128, 'y': 315, 'name': ""},
						  {'x': 334, 'y': 57, 'name': ""},
						  {'x': 75,  'y': 226, 'name': ""},
						  {'x': 249, 'y': 473, 'name': ""},
						  {'x': 302, 'y': 143, 'name': ""},
						  {'x': 302, 'y': 149, 'name': ""},
						  {'x': 132, 'y': 88, 'name': ""},
						  {'x': 214, 'y': 336, 'name': ""},
						  {'x': 116, 'y': 421, 'name': ""},
						  {'x': 54,  'y': 71, 'name': ""},
						  {'x': 469, 'y': 129, 'name': ""},
						  {'x': 350, 'y': 179, 'name': ""},
						  {'x': 244, 'y': 101, 'name': ""},
						  {'x': 87,  'y': 420, 'name': ""},
						  {'x': 256, 'y': 471, 'name': ""},
						  {'x': 13,  'y': 320, 'name': ""},
						  {'x': 234, 'y': 343, 'name': ""},
						  {'x': 296, 'y': 75, 'name': ""},
						  {'x': 435, 'y': 162, 'name': ""},
						  {'x': 258, 'y': 486, 'name': ""},
						  {'x': 123, 'y': 13, 'name': ""},
						  {'x': 112, 'y': 479, 'name': ""},
						  {'x': 422, 'y': 199, 'name': ""},
						  {'x': 87,  'y': 195, 'name': ""},
						  {'x': 8,   'y': 438, 'name': ""},
						  {'x': 71,  'y': 11, 'name': ""},
						  {'x': 248, 'y': 235, 'name': ""},
						  {'x': 89,  'y': 316, 'name': ""},
						  {'x': 378, 'y': 468, 'name': ""},
						  {'x': 40,  'y': 164, 'name': ""},
						  {'x': 333, 'y': 377, 'name': ""},
						  {'x': 453, 'y': 455, 'name': ""},
						  {'x': 390, 'y': 15, 'name': ""},
						  {'x': 187, 'y': 485, 'name': ""},
						  {'x': 482, 'y': 46, 'name': ""},
						  {'x': 166, 'y': 14, 'name': ""},
						  {'x': 302, 'y': 297, 'name': ""},
						  {'x': 382, 'y': 160, 'name': ""},
						  {'x': 389, 'y': 46, 'name': ""},
						  {'x': 339, 'y': 353, 'name': ""},
						  {'x': 233, 'y': 76, 'name': ""},
						  {'x': 353, 'y': 188, 'name': ""},
						  {'x': 354, 'y': 197, 'name': ""},
						  {'x': 400, 'y': 285, 'name': ""},
						  {'x': 350, 'y': 301, 'name': ""},
						  {'x': 241, 'y': 243, 'name': ""},
						  {'x': 68,  'y': 266, 'name': ""},
						  {'x': 328, 'y': 273, 'name': ""},
						  {'x': 409, 'y': 36, 'name': ""},
						  {'x': 223, 'y': 347, 'name': ""},
						  {'x': 119, 'y': 213, 'name': ""},
						  {'x': 308, 'y': 80, 'name': ""},
						  {'x': 109, 'y': 187, 'name': ""},
						  {'x': 190, 'y': 393, 'name': ""},
						  {'x': 214, 'y': 264, 'name': ""},
						  {'x': 175, 'y': 242, 'name': ""},
						  {'x': 47,  'y': 279, 'name': ""},
						  {'x': 165, 'y': 148, 'name': ""},
						  {'x': 287, 'y': 347, 'name': ""},
						  {'x': 144, 'y': 444, 'name': ""},
						  {'x': 381, 'y': 21, 'name': ""},
						  {'x': 411, 'y': 480, 'name': ""},
						  {'x': 259, 'y': 84, 'name': ""},
						  {'x': 159, 'y': 110, 'name': ""},
						  {'x': 276, 'y': 484, 'name': ""},
						  {'x': 113, 'y': 142, 'name': ""},
						  {'x': 277, 'y': 85, 'name': ""},
						  {'x': 236, 'y': 423, 'name': ""},
						  {'x': 323, 'y': 198, 'name': ""},
						  {'x': 415, 'y': 273, 'name': ""},
						  {'x': 37,  'y': 98, 'name': ""},
						  {'x': 42,  'y': 4, 'name': ""},
						  {'x': 244, 'y': 55, 'name': ""},
						  {'x': 332, 'y': 468, 'name': ""},
						  {'x': 249, 'y': 205, 'name': ""},
						  {'x': 5,   'y': 171, 'name': ""},
						  {'x': 163, 'y': 143, 'name': ""},
						  {'x': 222, 'y': 67, 'name': ""},
						  {'x': 350, 'y': 146, 'name': ""},
						  {'x': 271, 'y': 432, 'name': ""},
						  {'x': 146, 'y': 4, 'name': ""},
						  {'x': 135, 'y': 356, 'name': ""},
						  {'x': 490, 'y': 52, 'name': ""},
						  {'x': 488, 'y': 2, 'name': ""},
						  {'x': 114, 'y': 124, 'name': ""},
						  {'x': 444, 'y': 307, 'name': ""},
						  {'x': 459, 'y': 296, 'name': ""},
						  {'x': 104, 'y': 93, 'name': ""},
						  {'x': 393, 'y': 275, 'name': ""},
						  {'x': 118, 'y': 428, 'name': ""},
						  {'x': 50,  'y': 200, 'name': ""},
						  {'x': 46,  'y': 1, 'name': ""},
						  {'x': 178, 'y': 390, 'name': ""},
						  {'x': 483, 'y': 56, 'name': ""},
						  {'x': 82,  'y': 123, 'name': ""},
						  {'x': 41,  'y': 116, 'name': ""},
						  {'x': 6,   'y': 347, 'name': ""},
						  {'x': 350, 'y': 357, 'name': ""},
						  {'x': 449, 'y': 276, 'name': ""},
						  {'x': 232, 'y': 354, 'name': ""},
						  {'x': 198, 'y': 322, 'name': ""},
						  {'x': 292, 'y': 318, 'name': ""},
						  {'x': 430, 'y': 343, 'name': ""},
						  {'x': 388, 'y': 169, 'name': ""},
						  {'x': 176, 'y': 95, 'name': ""},
						  {'x': 275, 'y': 111, 'name': ""},
						  {'x': 93,  'y': 55, 'name': ""},
						  {'x': 77,  'y': 331, 'name': ""},
						  {'x': 377, 'y': 33, 'name': ""},
						  {'x': 229, 'y': 194, 'name': ""},
						  {'x': 107, 'y': 140, 'name': ""},
						  {'x': 460, 'y': 273, 'name': ""},
						  {'x': 212, 'y': 21, 'name': ""},
						  {'x': 371, 'y': 57, 'name': ""},
						  {'x': 447, 'y': 235, 'name': ""},
						  {'x': 80,  'y': 2, 'name': ""},
						  {'x': 185, 'y': 327, 'name': ""}
						  ]; */


		this.city_list = [{'x': this.x, 'y': this.y, 'name': this.name},
						  {'x': 325, 'y': 298, 'name': ""},
						  {'x': 231, 'y': 110, 'name': ""},
						  {'x': 485, 'y': 226, 'name': ""},
						  {'x': 176, 'y': 424, 'name': ""},
						  {'x': 95,  'y': 98, 'name': ""},
						  {'x': 477, 'y': 361, 'name': ""},
						  {'x': 490, 'y': 120,  'name': ""},
						  {'x': 397, 'y': 414, 'name': ""},
						  {'x': 408, 'y': 73, 'name': ""},
						  {'x': 439, 'y': 218, 'name': ""},
						  {'x': 33,  'y': 269, 'name': ""},
						  {'x': 355, 'y': 442, 'name': ""},
						  {'x': 128, 'y': 315, 'name': ""},
						  {'x': 334, 'y': 57, 'name': ""},
						  {'x': 75,  'y': 226, 'name': ""}];
		console.log("City instantiated!");
	}

	addCity(x_coord, y_coord, name = ""){
		//add a new city 
		this.city_list.push({'x':x_coord, 'y':y_coord, 'name':name});
	}

	randomPopulate(){
		//randomly populates 150 cities

		for (var i=0; i<150; i++){
			this.addCity(getRandomInt(1, 490), getRandomInt(1, 490));
		}
		console.log("finish adding 151 random cities.");
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
		this.best_solution = cities; //keeps track of current path/route
		this.best_cost = this.getCost(this.best_solution); //keeps track of the best cost
		this.best = cities; //set current cities to best
		this.cities = cities;
		this.original = cities;


		this.current = cities;

	}

	start(){
		//Starts SA	
		var p = this.isSame(this.original, this.best_solution);
		console.log(p);


		if (this.temperature > 1e-4){

			console.log(this.temperature);
			
			var current_cost = this.getCost(this.current);

			//var new_solution = this.neighbor(this.cities);
			var new_solution = this.neighbor(this.current);

			var new_cost = this.getCost(new_solution);
			
			//var ap = this.acceptanceProbability(this.best_cost, new_cost, this.temperature);
			var ap = this.acceptanceProbability(current_cost, new_cost, this.temperature);
			var rand = Math.random();

			if (ap > rand){

				this.current = jQuery.extend([], new_solution);
				current_cost = this.getCost(this.current);
			}

							if (current_cost < this.best_cost){
					this.best_solution = jQuery.extend([], this.current);
					this.best_cost = current_cost;
					this.redraw();
				}

			this.temperature = this.temperature * this.cooling; //linear cooling
			
		}

		console.log("best cost: ", this.best_cost);
		if (this.temperature > 1e-4){
			window.setTimeout(this.start.bind(this), 10);
		}
	}

	neighbor(cities){
		//Generates and return a random neighboring solution

		var new_route = jQuery.extend([], cities);

		var city1 = getRandomInt(0, cities.length-1);
		var city2 = (city1 + 1 + getRandomInt(0, cities.length-2))% cities.length;

		//randomly select two different cities
		while (city1 != city2){

			//swap the two cities
			var temp = new_route[city2];
			new_route[city2] = new_route[city1];
			new_route[city1] = temp;

			city1 = (city1+1) %cities.length;
			if (city1 == city2){
				break;
			}

			city2 = (city2-1+cities.length)%cities.length;
		}


		return new_route;
	}

	getCost(cities){
		//Returns the cost of the current path
		var cost = 0;

		for (var i=0; i<cities.length-1; i++){
			cost += getDistance(cities[i], cities[i+1]);
			//console.log("cost between (", cities[i].x , cities[i].y, ") and (", cities[i+1].x , cities[i+1].y, ") is : ", getDistance(cities[i], cities[i+1]));
		}

		cost += getDistance(cities[0], cities[cities.length-1]);
		//console.log("cost between (", cities[cities.length-1].x , cities[cities.length-1].y, ") and (", cities[0].x , cities[0].y, ") is : ", getDistance(cities[cities.length-1], cities[0]));

		return cost;

	}

	acceptanceProbability(old_cost, new_cost, curr_temp){
		//Returns a number between 0 and 1, using this we can decide whether or not
		//to jump to a new solution
		if (new_cost < old_cost){
			return 1;
		}
		var h = Math.exp((old_cost - new_cost)/curr_temp);

		return h;
	}


	redraw(){
		var canvas = document.getElementById("grid");

		var context = canvas.getContext("2d");

		context.clearRect(0, 0, canvas.width, canvas.height);

		draw_grid();

		this.drawCity();

		context.strokeStyle = "#ff99c2";
		context.fillStyle = "#ff99c2";

		context.beginPath();

		for (var i = 0; i<this.best_solution.length-1; i++){
			context.moveTo(this.best_solution[i].x, this.best_solution[i].y);
			context.lineTo(this.best_solution[i+1].x, this.best_solution[i+1].y);
		}
		context.stroke();

		context.beginPath();
		context.strokeStyle = "green";
		context.fillStyle = "green";

		context.moveTo(this.best_solution[this.best_solution.length-1].x, this.best_solution[this.best_solution.length-1].y);
		context.lineTo(this.best_solution[0].x, this.best_solution[0].y);

		context.stroke();
	}



	drawCity(){
		//plots the city on canvas
		var canvas = document.getElementById("grid");

		var context = canvas.getContext("2d");

		context.strokeStyle = "red";
		context.fillStyle = "red";

		for (let city of this.best_solution) {
			context.beginPath();
			context.arc(city.x, city.y, 2, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}
		
	}

	
	initialRoute(){

		console.log(this.cities);

		var canvas = document.getElementById("grid");

		var context = canvas.getContext("2d");

		context.strokeStyle = "blue";
		context.fillStyle = "blue";

		context.beginPath();

		for (var i = 0; i<this.cities.length-1; i++){
			context.moveTo(this.cities[i].x, this.cities[i].y);
			context.lineTo(this.cities[i+1].x, this.cities[i+1].y);
		}

		context.moveTo(this.cities[this.cities.length-1].x, this.cities[this.cities.length-1].y);
		context.lineTo(this.cities[0].x, this.cities[0].y);

		context.stroke();
	}

	isSame(originalArray, newArray){
		var isSame = true;

		for (var i = 0; i<originalArray.length; i++){
			if (originalArray[i].x != newArray[i].x && originalArray[i].y != newArray[i].y){
				isSame = false;
			}
		}

		if (isSame){
			return true;
		}

		return false;
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
	context.strokeStyle = "#e0e0eb";
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



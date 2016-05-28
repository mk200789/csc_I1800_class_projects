var timeBegin, timeEnd;
var canvas, context;

$(document).ready(function(){
	canvas = document.getElementById("grid");
	context = canvas.getContext("2d");

	//instantiate a new city taking in city, x, and y value
	var city = new City(100, 100);

	draw_grid();
	//city.randomPopulate();

	var sa = new SimulatedAnnealing(100, 0.999, city.city_list);
	//var sa = new SimulatedAnnealing(50, 0.99, city.city_list);

	document.getElementById("temperature").value = 1000;
	document.getElementById("cool_rate").value = 0.9999;
	document.getElementById("total_cities").value = 50;

	document.getElementById("start_path").onclick = function(){
		console.log("start!");
		timeBegin = performance.now();
		sa.nextSalesmen();
	}

});


class City {
	constructor(x_coord, y_coord){

		this.x = x_coord;
		this.y = y_coord;
		
		
		this.city_list = [{'x': this.x, 'y': this.y},
						  {'x': 325, 'y': 298},
						  {'x': 231, 'y': 110},
						  {'x': 485, 'y': 226},
						  {'x': 176, 'y': 424},
						  {'x': 95,  'y': 98},
						  {'x': 477, 'y': 361},
						  {'x': 490, 'y': 120},
						  {'x': 397, 'y': 414},
						  {'x': 408, 'y': 73},
						  {'x': 439, 'y': 218},
						  {'x': 139, 'y': 33},
						  {'x': 389, 'y': 314},
						  {'x': 44,  'y': 204},
						  {'x': 222, 'y': 207},
						  {'x': 298, 'y': 358},
						  {'x': 134, 'y': 481},
						  {'x': 458, 'y': 416},
						  {'x': 427, 'y': 264},
						  {'x': 414, 'y': 201},
						  {'x': 256, 'y': 202},
						  {'x': 183, 'y': 462},
						  {'x': 69,  'y': 463},
						  {'x': 346, 'y': 446},
						  {'x': 285, 'y': 81},
						  {'x': 478, 'y': 36},
						  {'x': 157, 'y': 361},
						  {'x': 211, 'y': 142},
						  {'x': 122, 'y': 184},
						  {'x': 19,  'y': 275},
						  {'x': 90,  'y': 205},
						  {'x': 464, 'y': 12},
						  {'x': 33,  'y': 269},
						  {'x': 355, 'y': 442},
						  {'x': 128, 'y': 315},
						  {'x': 334, 'y': 57},
						  {'x': 75,  'y': 226},
						  {'x': 249, 'y': 473},
						  {'x': 302, 'y': 143},
						  {'x': 302, 'y': 149},
						  {'x': 132, 'y': 88},
						  {'x': 214, 'y': 336},
						  {'x': 116, 'y': 421},
						  {'x': 54,  'y': 71},
						  {'x': 469, 'y': 129},
						  {'x': 350, 'y': 179},
						  {'x': 244, 'y': 101},
						  {'x': 87,  'y': 420},
						  {'x': 256, 'y': 471},
						  {'x': 13,  'y': 320},
						  {'x': 234, 'y': 343},
						  {'x': 296, 'y': 75},
						  {'x': 435, 'y': 162},
						  {'x': 258, 'y': 486},
						  {'x': 123, 'y': 13},
						  {'x': 112, 'y': 479},
						  {'x': 422, 'y': 199},
						  {'x': 87,  'y': 195},
						  {'x': 8,   'y': 438},
						  {'x': 71,  'y': 11},
						  {'x': 248, 'y': 235},
						  {'x': 89,  'y': 316},
						  {'x': 378, 'y': 468},
						  {'x': 40,  'y': 164},
						  {'x': 333, 'y': 377},
						  {'x': 453, 'y': 455},
						  {'x': 390, 'y': 15},
						  {'x': 187, 'y': 485},
						  {'x': 482, 'y': 46},
						  {'x': 166, 'y': 14},
						  {'x': 302, 'y': 297},
						  {'x': 382, 'y': 160},
						  {'x': 389, 'y': 46},
						  {'x': 339, 'y': 353},
						  {'x': 233, 'y': 76},
						  {'x': 353, 'y': 188},
						  {'x': 354, 'y': 197},
						  {'x': 400, 'y': 285},
						  {'x': 350, 'y': 301},
						  {'x': 241, 'y': 243},
						  {'x': 68,  'y': 266},
						  {'x': 328, 'y': 273},
						  {'x': 409, 'y': 36},
						  {'x': 223, 'y': 347},
						  {'x': 119, 'y': 213},
						  {'x': 308, 'y': 80},
						  {'x': 109, 'y': 187},
						  {'x': 190, 'y': 393},
						  {'x': 214, 'y': 264},
						  {'x': 175, 'y': 242},
						  {'x': 47,  'y': 279},
						  {'x': 165, 'y': 148},
						  {'x': 287, 'y': 347},
						  {'x': 144, 'y': 444},
						  {'x': 381, 'y': 21},
						  {'x': 411, 'y': 480},
						  {'x': 259, 'y': 84},
						  {'x': 159, 'y': 110},
						  {'x': 276, 'y': 484},
						  {'x': 113, 'y': 142},
						  {'x': 277, 'y': 85},
						  {'x': 236, 'y': 423},
						  {'x': 323, 'y': 198},
						  {'x': 415, 'y': 273},
						  {'x': 37,  'y': 98},
						  {'x': 42,  'y': 4},
						  {'x': 244, 'y': 55},
						  {'x': 332, 'y': 468},
						  {'x': 249, 'y': 205},
						  {'x': 5,   'y': 171},
						  {'x': 163, 'y': 143},
						  {'x': 222, 'y': 67},
						  {'x': 350, 'y': 146},
						  {'x': 271, 'y': 432},
						  {'x': 146, 'y': 4},
						  {'x': 135, 'y': 356},
						  {'x': 490, 'y': 52},
						  {'x': 488, 'y': 2},
						  {'x': 114, 'y': 124},
						  {'x': 444, 'y': 307},
						  {'x': 459, 'y': 296},
						  {'x': 104, 'y': 93},
						  {'x': 393, 'y': 275},
						  {'x': 118, 'y': 428},
						  {'x': 50,  'y': 200},
						  {'x': 46,  'y': 1},
						  {'x': 178, 'y': 390},
						  {'x': 483, 'y': 56},
						  {'x': 82,  'y': 123},
						  {'x': 41,  'y': 116},
						  {'x': 6,   'y': 347},
						  {'x': 350, 'y': 357},
						  {'x': 449, 'y': 276},
						  {'x': 232, 'y': 354},
						  {'x': 198, 'y': 322},
						  {'x': 292, 'y': 318},
						  {'x': 430, 'y': 343},
						  {'x': 388, 'y': 169},
						  {'x': 176, 'y': 95},
						  {'x': 275, 'y': 111},
						  {'x': 93,  'y': 55},
						  {'x': 77,  'y': 33},
						  {'x': 377, 'y': 33},
						  {'x': 229, 'y': 194},
						  {'x': 107, 'y': 140},
						  {'x': 460, 'y': 273},
						  {'x': 212, 'y': 21},
						  {'x': 371, 'y': 57},
						  {'x': 447, 'y': 235},
						  {'x': 80,  'y': 2},
						  ]; 
		
		
		/*
		this.city_list = [{'x': this.x, 'y': this.y},
						  {'x': 244, 'y': 101},
						  {'x': 13,  'y': 320},
						  {'x': 112, 'y': 479},
						  {'x': 422, 'y': 199},
						  {'x': 87,  'y': 195},
						  {'x': 8,   'y': 438},
						  {'x': 71,  'y': 11},
						  {'x': 248, 'y': 235},
						  {'x': 339, 'y': 353},
						  {'x': 233, 'y': 76},
						  {'x': 353, 'y': 188},
						  {'x': 354, 'y': 197},
						  {'x': 400, 'y': 285},
						  {'x': 350, 'y': 301},
						  {'x': 241, 'y': 243},
						  {'x': 68,  'y': 266},
						  {'x': 328, 'y': 273},
						  {'x': 409, 'y': 36},
						  {'x': 223, 'y': 347},
						  {'x': 119, 'y': 213},
						  {'x': 308, 'y': 80},
						  {'x': 214, 'y': 264},
						  {'x': 175, 'y': 242},
						  {'x': 47,  'y': 279},
						  {'x': 165, 'y': 148},
						  {'x': 287, 'y': 347},
						  {'x': 144, 'y': 444},
						  {'x': 381, 'y': 21}];

		*/

		console.log("City instantiated!");
	}

	addCity(x_coord, y_coord){
		//add a new city 
		this.city_list.push({'x':x_coord, 'y':y_coord});
	}

	randomPopulate(){
		//randomly populates 150 cities

		for (var i=0; i<149; i++){
			this.addCity(getRandomInt(1, 490), getRandomInt(1, 490));
		}
		console.log("finish adding 150 random cities.");
	}
}

class SimulatedAnnealing {
	constructor(temp, cooling, cities){
		this.temperature = temp; //keeps track of current temperature
		
		this.original_temp = temp; //stores the original temperature
		
		this.cooling = cooling;

		this.cities = cities;

		this.current = cities;

		var temp = this.k_means(cities);

		this.centroids = temp["centroids"]; //salesmen

		this.clusters  = temp["clusters"]; // grouped cities that for each salesman

		this.best_solution = this.clusters; //keeps track of current path/route for each salesmen

		this.initial_distance = this.initialDistance(this.centroids, this.clusters);

		this.best_cost = jQuery.extend([], this.initial_distance);

		this.salesman_count = 0;

		console.log("initialDistance(): ", this.initial_distance);

		this.redraw();

	}


	initialDistance(salesmen, clusters){
		//Returns the cost of the initial cities assign to each salesmen

		var initial_distance=[]; 

		for (var i=0; i <salesmen.length; i++){
			initial_distance[i] = this.getCost(clusters[i]);
		}

		return initial_distance;
	}

	nextSalesmen(){
		//Goes over each salesmen in this.centroids (list of salesmen)

		console.log("loop: ", this.salesman_count, "<",this.centroids.length);
		if (this.salesman_count < this.centroids.length){
			console.log("c0: ",this.salesman_count);
			this.temperature = this.original_temp;
			this.current = this.clusters[this.salesman_count];

			var _this = this;
			setTimeout(function(){
				console.log("HELLO1");
				_this.redraw();
				_this.anneal(_this.salesman_count);
			}, 2);
			
		}
		else{
			//draw the last salemen's route
			this.redraw();
			timeEnd = performance.now();
			console.log("Total time: ", ((timeEnd-timeBegin)*0.001).toFixed(2), " seconds" );
		}
	}

	anneal(center){
		//Starts SA	

		if (this.temperature > 1e-4){

			console.log(this.temperature);
			
			var current_cost = this.getCost(this.current);

			//var new_solution = this.neighbor(this.cities);
			var new_solution = this.neighbor(this.current);

			var new_cost = this.getCost(new_solution);
			
			var ap = this.acceptanceProbability(current_cost, new_cost, this.temperature);
			
			var rand = Math.random();

			if (ap > rand){

				this.current = jQuery.extend([], new_solution);
				current_cost = this.getCost(this.current);
			}

			if (current_cost < this.best_cost[center]){
					this.best_solution[center] = jQuery.extend([], this.current);
					this.best_cost[center] = current_cost;
					//this.redraw();
			}
			
			this.temperature = this.temperature * this.cooling; //linear cooling

			console.log("best cost: ", this.best_cost[center], center);
			
		}

		if (this.temperature > 1e-4){
			var _this = this;
			setTimeout(function(){
				console.log("hit it!");
				_this.anneal(center);
			}, 2); //400
		}
		else{
			console.log("Initial cost: ", this.initial_distance);
			console.log("Best cost: ", this.best_cost);
			this.salesman_count += 1;
			this.nextSalesmen();

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

		console.log("redraw()");

		context.clearRect(0, 0, canvas.width, canvas.height);

		setTimeout(function(){
			console.log("c1");
			draw_grid();
		},50); //100

		var _this = this;
		setTimeout(function(){
			console.log("c2");
			_this.drawCity();
		}, 100); //200

		setTimeout(function(){
			console.log("c3");

			for (let cluster of _this.best_solution){
				context.strokeStyle = "#ff99c2";
				context.beginPath();

				for (var i=0; i <cluster.length-1; i++){
					
					context.moveTo(cluster[i].x, cluster[i].y);
					context.lineTo(cluster[i+1].x, cluster[i+1].y);
				}
				context.stroke();

				context.beginPath();
				context.strokeStyle = "green";
				context.fillStyle = "green";

				context.moveTo(cluster[cluster.length-1].x, cluster[cluster.length-1].y);
				context.lineTo(cluster[0].x, cluster[0].y);
				context.stroke();
			}


			context.strokeStyle = "#ff80ff";
			context.fillStyle = "#ff80ff";

			for (let p of _this.centroids) {
				context.beginPath();
				context.arc(p.x, p.y, 2, 0, 2 * Math.PI);
				context.fill();
				context.stroke();
			}
		},150); //300
	}


	drawCity(){
		//draws the city (points)
		console.log("drawCity()");

		context.strokeStyle = "red";
		context.fillStyle = "red";


		for (let city of this.cities){
			context.beginPath();
			context.arc(city.x, city.y, 2, 0, 2 * Math.PI);
			context.fill();
			context.stroke();			
		}	
		
	}

	
	k_means(cities){
		/*
			Returns a `result` list containing the centroids and clusters.
		*/

		var result = [];
		
		var k = 5; //number of clusters

		var centroids = []; 
		
		for (var i=0; i<k; i++){
			centroids.push(cities[i]);
		}

		var previous_clusters = [];

		var clusters = [];

		while (1){
			//reset clusters
			clusters = [];

			for (var i=0; i<k; i++){
				clusters.push([]);
			}

			//assign cities to nearest centroid
			for (let city of cities){
				var min_j = 0;
				var min_distance = 1000;

				for (var i=0; i<k; i++){
					var dist = getDistance(city, centroids[i]);
					if (dist <= min_distance){
						min_j = i;
						min_distance = dist;
					}
				}
				clusters[min_j].push(city);
			}
			
			for (var i=0; i<k; i++){
				var center = {"x":0, "y":0};

				for (let city of clusters[i]){
					center.x += city.x;
					center.y += city.y;
				}
				centroids[i] = {"x":center.x/clusters[i].length, "y": center.y/clusters[i].length};
			}
			
			if (this.isSame(previous_clusters, clusters) == true){
				break;
			}

			previous_clusters = clusters
		}

		console.log("Centroids: ", centroids);
		console.log("Clusters: ", clusters);

		result["clusters"] = clusters;
		result["centroids"] = centroids;

		return result;

	}


	isSame(originalArray, newArray){
		//checks if two arrays are the same, if they're the same size they're not the same, so return
		var isSame = true;

		if (originalArray.length == 0){
			return false;
		}


		for (var i = 0; i<originalArray.length; i++){

			if (originalArray[i].length != newArray[i].length){
				return false;
			}
			else{
				for (var j = 0; j<originalArray[i].length; j++){
					if (originalArray[i][j].x != newArray[i][j].x && originalArray[i][j].y != newArray[i][j].y){
						return false;
					}
				}
			}
		}
		return true;
	}

}


function draw_grid(){
	//draws the grid
	console.log("GRID!");

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


function getDistance(p1, p2){
	//Returns the distance between two points
	return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}


function getRandomInt(min, max) {
	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

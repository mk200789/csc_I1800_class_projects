var timeBegin;
var timeEnd;

var canvas;
var context;

$(document).ready(function(){
	canvas = document.getElementById("grid");
	context = canvas.getContext("2d");

	//instantiate a new city taking in city, x, and y value
	var city = new City(100, 100);

	draw_grid();
	//city.randomPopulate();

	//var sa = new SimulatedAnnealing(1000, 0.9999, city.city_list);
	var sa = new SimulatedAnnealing(1000, 0.99, city.city_list);
	//var sa = new SimulatedAnnealing(1000, 0.999, city.city_list);

	document.getElementById("temperature").value = 1000;
	document.getElementById("cool_rate").value = 0.9999;
	document.getElementById("total_cities").value = 50;
	
	sa.k_means(city.city_list);

	document.getElementById("start_path").onclick = function(){
		console.log("start!");
		sa.start();
	}

});


class City {
	constructor(x_coord, y_coord){

		this.x = x_coord;
		this.y = y_coord;
		

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
		this.temperature = temp; //initial temperature
		this.original_temp = temp;
		this.cooling = cooling;


		this.best_solution = cities; //keeps track of current path/route

		//this.best_cost = this.getCost(this.best_solution); //keeps track of the best cost
		this.best_cost = [];

		this.best = cities; //set current cities to best
		this.cities = cities;

		//this.initial_distance = 0;
		this.initial_distance = [];

		this.current = cities;

		this.centroids = [];
		this.clusters  = [];

	}


	start(){
		this.best_solution = this.clusters;

		for (var center=0; center <this.centroids.length; center++){
			this.initial_distance[center] = this.getCost(this.clusters[center]);
		}

		this.best_cost = jQuery.extend([], this.initial_distance);
		
		

		var _this = this;

		for (var center=0; center <_this.centroids.length; center++){
			
			var c = center;
			console.log(c);

			setTimeout(function(){
				console.log("c0: ", c);
				_this.temperature = _this.original_temp;
				_this.current = _this.clusters[c];
				_this.anneal(c);
			}, 100);
			break;
			

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
			
			//var ap = this.acceptanceProbability(this.best_cost, new_cost, this.temperature);
			var ap = this.acceptanceProbability(current_cost, new_cost, this.temperature);
			var rand = Math.random();


			if (ap > rand){

				this.current = jQuery.extend([], new_solution);
				current_cost = this.getCost(this.current);
			}

			if (current_cost < this.best_cost[center]){
					this.best_solution[center] = jQuery.extend([], this.current);
					this.best_cost[center] = current_cost;
					this.redraw();
			}
			
			this.temperature = this.temperature * this.cooling; //linear cooling
			//console.log(this.best_cost);
			console.log("best cost: ", this.best_cost[center], center);
			
		}

		if (this.temperature > 1e-4){
			var _this = this;
			setTimeout(function(){
				console.log("hit it!");
				_this.anneal(center);
			}, 400);
			//this.anneal(center);
		}
		else{
			console.log("Initial cost: ", this.initial_distance);
			console.log("Best cost: ", this.best_cost);
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
		},100);

		var _this = this;
		setTimeout(function(){
			console.log("c2");
			_this.drawCity();
		}, 200);

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
		},300);

/*		
		for (let cluster of this.best_solution){
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

		for (let p of this.centroids) {
			context.beginPath();
			context.arc(p.x, p.y, 2, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}
*/

	}



	drawCity(){

		console.log("drawCity()");
		//plots the city on canvas

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
		var n = jQuery.extend([], this.cities);
		var k = 2;

		var centroids = [];
		
		for (var i=0; i<k; i++){
			centroids.push(n[i]);
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
			for (let city of n){
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

			//break;
		}

		console.log("Centroids: ", centroids);
		console.log("Clusters: ", clusters);

		context.strokeStyle = "red";
		context.fillStyle = "red";

		for (let city of cities){
			context.beginPath();
			context.arc(city.x, city.y, 2, 0, 2 * Math.PI);
			context.fill();
			context.stroke();			
		}	

		context.strokeStyle = "#ff80ff";
		context.fillStyle = "#ff80ff";

		for (let p of centroids) {
			context.beginPath();
			context.arc(p.x, p.y, 2, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}

		this.clusters = clusters;
		this.centroids = centroids;


		context.strokeStyle = "blue";
		context.fillStyle = "blue";

		context.beginPath();

		for (let cluster of this.clusters){
			for (var i=0; i<cluster.length-1; i++){
				context.moveTo(cluster[i].x, cluster[i].y);
				context.lineTo(cluster[i+1].x, cluster[i+1].y);
			}
			context.moveTo(cluster[cluster.length-1].x , cluster[cluster.length-1].y);
			context.lineTo(cluster[0].x, cluster[0].y);
		}

		context.stroke();

	}


	isSame(originalArray, newArray){
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

//Returns the distance between two points
function getDistance(p1, p2){
	return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}


// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



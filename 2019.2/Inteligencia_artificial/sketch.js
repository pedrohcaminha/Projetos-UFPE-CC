let order = ["cima", "direita", "baixo", "esquerda"]
var rows = 60
var cols = 21
var grid = new Array(cols)

var ASTARopenSet = []
var ASTARclosedSet = []

var BFSopenSet = []
var BFSclosedSet = []

var DFSopenSet = []
var DFSclosedSet = []

var GREEDYopenSet = []
var GREEDYclosedSet = []

var UCopenSet = []
var UCclosedSet = []

var start
var end

var w
var h

var astar = true
var bfs = true
var dfs = true
var greedy = true
var uc = true

var ASTARpath = []
var BFSpath = []
var DFSpath = []
var GREEDYpath = []
var UCpath = []

function removeArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
	  if (arr[i] == elt) {
		arr.splice(i, 1);
	  }
	}
  }

function heuristic(a, b) {
	return dist(a.x, b.x, a.y, b.y)
}



function spot(i, j) {
	this.f = 0
	this.g = 0
	this.h = 0

	this.GREEDYf = 0
	this.GREEDYg = 0
	this.GREEDYh = 0

	this.UCf = 0
	this.UCg = 0
	this.UCh = 0

	this.x = i
	this.y = j

	this.ASTARprevious = undefined
	this.BFSprevious = undefined
	this.DFSprevious = undefined
	this.GREEDYprevious = undefined
	this.UCprevious = undefined

	this.wall = false
	if(random(1) < 0.25){
		this.wall = true
	}

	this.show = function(col, i) {
		fill(col)
		noStroke()
		if(this.wall){
			fill(0,100)
		}
		rect(this.x * w + (cols * w * (i-1)+(i-1)*20), this.y * h, w-1, h-1)
	}

	this.neighbors = []

	this.addNeighbors = function(grid) {
		var i = this.x
		var j = this.y
		
		for(let index = 0; index < 4; index++){
			console.log(order[index])
			if(order[index] == "baixo"){
				if(i > 0){
					if(!grid[i-1][j].wall)
					this.neighbors.push(grid[i-1][j])
				}
			}
			if(order[index] == "esquerda"){
				if(j > 0){
					if(!grid[i][j-1].wall)
					this.neighbors.push(grid[i][j-1])
				}
			}
			if(order[index] == "cima"){
				if(i < cols - 1){
					if(!grid[i+1][j].wall)
					this.neighbors.push(grid[i+1][j])
				}
			}
			if(order[index] == "direita"){
				if(j < rows - 1){
					if(!grid[i][j+1].wall)
					this.neighbors.push(grid[i][j+1])
				}
			}
		}
	}
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	w = ((width-100) / cols) / 5
	h = (height-150) / rows
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(rows)
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new spot(i, j)	
		}
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid)
		}
	}
	
	start = grid[0][0]
	end = grid[cols-1][rows-1]

	ASTARopenSet.push(start)
	BFSopenSet.push(start)
	DFSopenSet.push(start)
	GREEDYopenSet.push(start)
	UCopenSet.push(start)
}

function draw() {
	
	if(astar){
		aStar()
	}
	if(bfs){
		BFS()
	}
	if(dfs){
		DFS()
	}
	if(greedy){
		Greedy()
	}
	if(uc){
		UC()
	}
	background(0);
	for (let i = 0; i < 5; i++) {
		fill(255)
		rect((width/5)*i, height-140, (width/5)-20, 140)
	}
	fill(0)
	stroke(0)
	textSize(30);
	text("BFS", (width/5)*0+ 5 , height-140, 300, 100)
	text("DFS", (width/5)*1+ 5 , height-140, 300, 100)
	text("UC", (width/5)*2+ 5 , height-140, 300, 100)
	text("GREEDY", (width/5)*3+ 5 , height-140, 300, 100)
	text("A STAR", (width/5)*4+ 5 , height-140, 300, 100)

	text("Custo: "+ BFSpath.length, (width/5)*0+ 5 , height-110, 300, 100)
	text("Custo: "+ DFSpath.length, (width/5)*1+ 5 , height-110, 300, 100)
	text("Custo: "+ UCpath.length, (width/5)*2+ 5 , height-110, 300, 100)
	text("Custo: "+ GREEDYpath.length, (width/5)*3+ 5 , height-110, 300, 100)
	text("Custo: "+ ASTARpath.length, (width/5)*4+ 5 , height-110, 300, 100)

	text("Visitados: "+ BFSclosedSet.length, (width/5)*0+ 5 , height-80, 300, 100)
	text("Visitados: "+ DFSclosedSet.length, (width/5)*1+ 5 , height-80, 300, 100)
	text("Visitados: "+ UCclosedSet.length, (width/5)*2+ 5 , height-80, 300, 100)
	text("Visitados: "+ GREEDYclosedSet.length, (width/5)*3+ 5 , height-80, 300, 100)
	text("Visitados: "+ ASTARclosedSet.length, (width/5)*4+ 5 , height-80, 300, 100)

	text("Franja: "+ BFSopenSet.length, (width/5)*0+ 5 , height-50, 300, 100)
	text("Franja: "+ DFSopenSet.length, (width/5)*1+ 5 , height-50, 300, 100)
	text("Franja: "+ UCopenSet.length, (width/5)*2+ 5 , height-50, 300, 100)
	text("Franja: "+ GREEDYopenSet.length, (width/5)*3+ 5 , height-50, 300, 100)
	text("Franja: "+ ASTARopenSet.length, (width/5)*4+ 5 , height-50, 300, 100)




	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
		grid[i][j].show(color(255), 5);
		}
	}

	for (var i = 0; i < ASTARclosedSet.length; i++) {
		ASTARclosedSet[i].show(color(255, 0, 0), 5);
	}

	for (var i = 0; i < ASTARopenSet.length; i++) {
		ASTARopenSet[i].show(color(0, 255, 0), 5);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
		grid[i][j].show(color(255), 1);
		}
	}

	for (var i = 0; i < BFSclosedSet.length; i++) {
		BFSclosedSet[i].show(color(255, 0, 0), 1);
	}

	for (var i = 0; i < BFSopenSet.length; i++) {
		BFSopenSet[i].show(color(0, 255, 0), 1);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
		grid[i][j].show(color(255), 2);
		}
	}

	for (var i = 0; i < DFSclosedSet.length; i++) {
		DFSclosedSet[i].show(color(255, 0, 0), 2);
	}

	for (var i = 0; i < DFSopenSet.length; i++) {
		DFSopenSet[i].show(color(0, 255, 0), 2);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
		grid[i][j].show(color(255), 4);
		}
	}

	for (var i = 0; i < GREEDYclosedSet.length; i++) {
		GREEDYclosedSet[i].show(color(255, 0, 0), 4);
	}

	for (var i = 0; i < GREEDYopenSet.length; i++) {
		GREEDYopenSet[i].show(color(0, 255, 0), 4);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
		grid[i][j].show(color(255), 3);
		}
	}

	for (var i = 0; i < UCclosedSet.length; i++) {
		UCclosedSet[i].show(color(255, 0, 0), 3);
	}

	for (var i = 0; i < UCopenSet.length; i++) {
		UCopenSet[i].show(color(0, 255, 0), 3);
	}

	for (var i = 0; i < ASTARpath.length; i++) {
		ASTARpath[i].show(color(0, 0, 255), 5);
	}
	for (var i = 0; i < BFSpath.length; i++) {
		BFSpath[i].show(color(0, 0, 255), 1);
	}
	for (var i = 0; i < DFSpath.length; i++) {
		DFSpath[i].show(color(0, 0, 255), 2);
	}
	for (var i = 0; i < GREEDYpath.length; i++) {
		GREEDYpath[i].show(color(0, 0, 255), 4);
	}
	for (var i = 0; i < UCpath.length; i++) {
		UCpath[i].show(color(0, 0, 255), 3);
	}
}

function aStar() {
	
	if(ASTARopenSet.length > 0){

		var winner = 0

		for (var i = 0; i < ASTARopenSet.length; i++) {
			if(ASTARopenSet[i].f < ASTARopenSet[winner].f){
				 winner = i
			}
		}

		var current = ASTARopenSet[winner]
		if(frameCount < 5){
			console.log(current)
		}

		if(current == end){

			console.log("A* DONE!")
			astar = false
		}

		removeArray(ASTARopenSet, current)
		ASTARclosedSet.push(current)

		var neighbors = current.neighbors
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i]

			if(!ASTARclosedSet.includes(neighbor)){
				var tempG = current.g + heuristic(current, neighbor)

				if (ASTARopenSet.includes(neighbor)) {
					if(tempG  < neighbor.g){
						neighbor.g = tempG
					}
				}else{
					neighbor.g = tempG
					ASTARopenSet.push(neighbor)
				}

				neighbor.h = heuristic(neighbor, end)
				neighbor.f = neighbor.h + neighbor.g
				neighbor.ASTARprevious = current
			}
		}

		ASTARpath = []
		var temp = current
		ASTARpath.push(temp)
		while(temp.ASTARprevious){
			ASTARpath.push(temp.ASTARprevious)
			temp = temp.ASTARprevious
		}
		
		
	}else{
		console.log("A* NO SOLUTION!")
		astar = false
	}
}

function BFS() {
	if(BFSopenSet.length > 0){
		var current = BFSopenSet[0]
		if(current == end){
			console.log("BFS DONE!")
			bfs = false
		}
		removeArray(BFSopenSet, current)
		BFSclosedSet.push(current)
		for (var i = 0; i < current.neighbors.length; i++) {
			if(!BFSclosedSet.includes(current.neighbors[i])){
				BFSopenSet.push(current.neighbors[i])
				current.neighbors[i].BFSprevious = current
			}
		}
		BFSpath = []
		var temp = current
		BFSpath.push(temp)
		while(temp.BFSprevious){
			BFSpath.push(temp.BFSprevious)
			temp = temp.BFSprevious
		}
	}else{
		console.log("BFS NO SOLUTION!")
		bfs = false
	}
	
}

function DFS() {
	if(DFSopenSet.length > 0){
		var current = DFSopenSet.pop()
		if(current == end){
			console.log("DFS DONE!")
			dfs = false
		}
		DFSclosedSet.push(current)
		for (var i = 0; i < current.neighbors.length; i++) {
			if(!DFSclosedSet.includes(current.neighbors[i])){
				DFSopenSet.push(current.neighbors[i])
				current.neighbors[i].DFSprevious = current
			}
		}
		DFSpath = []
		var temp = current
		DFSpath.push(temp)
		while(temp.DFSprevious){
			DFSpath.push(temp.DFSprevious)
			temp = temp.DFSprevious
		}
	}else{
		console.log("DFS NO SOLUTION!")
		dfs = false
	}
}

function Greedy() {
	if(GREEDYopenSet.length > 0){

		var winner = 0

		for (var i = 0; i < GREEDYopenSet.length; i++) {
			if(GREEDYopenSet[i].GREEDYf < GREEDYopenSet[winner].GREEDYf){
				 winner = i
			}
		}

		var current = GREEDYopenSet[winner]
		if(frameCount < 5){
			console.log(current)
		}
		if(current == end){

			console.log("GREEDY DONE!")
			greedy = false
		}

		removeArray(GREEDYopenSet, current)
		GREEDYclosedSet.push(current)

		var neighbors = current.neighbors
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i]

			if(!GREEDYclosedSet.includes(neighbor)){
				var tempG = current.GREEDYg + heuristic(current, neighbor)

				if (GREEDYopenSet.includes(neighbor)) {
					if(tempG  < neighbor.GREEDYg){
						neighbor.GREEDYg = tempG
					}
				}else{
					neighbor.GREEDYg = tempG
					GREEDYopenSet.push(neighbor)
				}

				neighbor.GREEDYh = heuristic(neighbor, end)
				neighbor.GREEDYf = neighbor.GREEDYh
				neighbor.GREEDYprevious = current
			}
		}

		GREEDYpath = []
		var temp = current
		GREEDYpath.push(temp)
		while(temp.GREEDYprevious){
			GREEDYpath.push(temp.GREEDYprevious)
			temp = temp.GREEDYprevious
		}
		
		
	}else{
		console.log("GREEDY NO SOLUTION!")
		greedy = false
	}
}

function UC() {
	if(UCopenSet.length > 0){

		var winner = 0

		for (var i = 0; i < UCopenSet.length; i++) {
			if(UCopenSet[i].UCf < UCopenSet[winner].UCf){
				 winner = i
			}
		}

		var current = UCopenSet[winner]

		if(current == end){

			console.log("UC DONE!")
			uc = false
		}

		removeArray(UCopenSet, current)
		UCclosedSet.push(current)
		if(frameCount < 5){
			console.log(current)
		}
		var neighbors = current.neighbors
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i]

			if(!UCclosedSet.includes(neighbor)){
				var tempG = current.UCg + heuristic(current, neighbor)

				if (UCopenSet.includes(neighbor)) {
					if(tempG  < neighbor.UCg){
						neighbor.UCg = tempG
					}
				}else{
					neighbor.UCg = tempG
					UCopenSet.push(neighbor)
				}

				neighbor.UCh = heuristic(neighbor, end)
				neighbor.UCf = neighbor.g
				neighbor.UCprevious = current
			}
		}

		UCpath = []
		var temp = current
		UCpath.push(temp)
		while(temp.UCprevious){
			UCpath.push(temp.UCprevious)
			temp = temp.UCprevious
		}
		
		
	}else{
		console.log("UC NO SOLUTION!")
		uc = false
	}
}
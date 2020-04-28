//Made by Pedro Caminha

//Variavel global de espaco
let height, width

//Board 
let board = []

let avaliacoes = 1/1000

let curveIterator = 0
let maxCurve = 0
//array de pontos
let pointsX = []
let pointsY = []
pointsX[curveIterator] = []
pointsY[curveIterator] = []

let addPointIterator = 0
let pointsIterator = []

let colors = []

let pintarCurva = true
let pintarPonto = true
let pintarLinha = true

//pegar a posicao do mouse para comparar e arrastar os pontos
let lastX = 0
let lastY = 0

function setup() {
	
	height = windowHeight
	width = windowWidth
	//startx do board
	board[0] = width*0.2
	//endx do board
	board[1] = width
	//starty do board
	board[2] = 0
	//endy do board
	board[3] = height
	//width do board
	board[4] = board[1]-board[0]
	//height do board
	board[5] = board[3]-board[2]
	createCanvas(width, height)
	background(255)

	let newCurveButton = createButton('Criar nova curva');
	newCurveButton.position(19, 40);
	newCurveButton.mousePressed(criarNovaCurva);

	let ApagarAtualButton = createButton('Apagar curva atual');
	ApagarAtualButton.position(19, 70);
	ApagarAtualButton.mousePressed(ApagarAtual);

	let plus = createButton('+');
	plus.position(19, 100);
	plus.mousePressed(plusCurve);

	let minus = createButton('-');
	minus.position(19, 130);
	minus.mousePressed(minusCurve);

	let textAvaliacoes = createInput("1000", text)
	textAvaliacoes.position(19, 160)
	textAvaliacoes.input(avaliacoesOnChange);

	let Pontosdecontrole = createCheckbox("pontos de controle", true)
	Pontosdecontrole.position(19, 190)
	Pontosdecontrole.changed(pontos)

	let Poligonaisdecontrole = createCheckbox("Poligonais de controle", true)
	Poligonaisdecontrole.position(19, 220)
	Poligonaisdecontrole.changed(poligonais)

	let curvas = createCheckbox("curvas", true)
	curvas.position(19, 250)
	curvas.changed(curvass)

	let save = createButton('Save');
	save.position(19, 280);
	save.mousePressed(saveCanv);



	colors[0] = color(random(0,255),random(0,255),random(0,255))
	
}

function saveCanv(){
	save('myCanvas.jpg');
}

function pontos(){
	
		if (this.checked()) {
		  pintarPonto = true
		} else {
		  pintarPonto = false
		}
	  
}

function poligonais(){
	
	if (this.checked()) {
	  pintarLinha = true
	} else {
	  pintarLinha = false
	}
  
}

function curvass(){
	
	if (this.checked()) {
	  pintarCurva = true
	} else {
	  pintarCurva = false
	}
  
}

function ApagarAtual(){
	let aux = []
	pointsX[curveIterator] = aux
	pointsX[curveIterator] = aux
	addPointIterator = 0
}

function avaliacoesOnChange(){
	avaliacoes = 1/min(max(1,this.value()),1000)
}

function plusCurve(){
	curveIterator = min(curveIterator + 1, maxCurve)
}

function minusCurve(){
	curveIterator = max(curveIterator - 1, 0)
}

function criarNovaCurva(){
	pointsIterator[maxCurve] = addPointIterator
	maxCurve++
	curveIterator = maxCurve
	colors[curveIterator] = color(random(0,255),random(0,255),random(0,255))
	addPointIterator = 0
	pointsX[curveIterator] = []
	pointsY[curveIterator] = []
}

function draw() {
	reset()

		

	lastX = mouseX
	lastY = mouseY

	if(keyIsDown(DOWN_ARROW)){//funcao para deletar pontos
		let shiftLeft = 0
		let auxArrayX = []
		let auxArrayY = []
		for (let i = 0; i < pointsX[curveIterator].length; i++) {

			if(mouseX >= pointsX[curveIterator][i]-10 & mouseX <= pointsX[curveIterator][i]+10 & mouseY >= pointsY[curveIterator][i]-10 & mouseY <= pointsY[curveIterator][i]+10){
				shiftLeft = i
				for (let index = shiftLeft; index < pointsX[curveIterator].length-1; index++) {
					
					auxArrayX[index] = pointsX[curveIterator][index + 1]
					auxArrayY[index] = pointsY[curveIterator][index + 1]
					
					
				}
				console.log(pointsX)
				console.log(auxArrayX)
				pointsX[curveIterator] = auxArrayX
				pointsY[curveIterator] = auxArrayY
				addPointIterator--
				break
			}
			auxArrayX[i] = pointsX[curveIterator][i]
			auxArrayY[i] = pointsY[curveIterator][i]
		}
	}
	for (let index = 0; index < pointsX.length; index++) {
		drawSet(index)
		if(pointsX[index].length >= 2)
		drawCurve(index)
		
	}

}

function reset(){ //Essa funcao desenha o frame preto ao redor da area usada para fazer as curvas
	background(255)
	fill(0)
	rect(board[0], board[2], board[4], board[5])
	fill(255)
	rect(board[0]+1, board[2]+1, board[4]-1, board[5]-1)
}

function drawSet(index){
	for (let i = 0; i < pointsX[index].length; i++) {
		if(pintarPonto){
		if(index == curveIterator){
			fill(255,0,0)
		}else{
			fill(colors[index]);
		}
		ellipse(pointsX[index][i], pointsY[index][i], 20)
		
		}
		if(pintarLinha){
			if(i+1 < pointsX[index].length)
			line(pointsX[index][i], pointsY[index][i], pointsX[index][i+1], pointsY[index][i+1])
		}
		

	}
}


function mouseClicked(){ //funcao para adicionar novo ponto
	let ok = true
	
	for (let i = 0; i < pointsX[curveIterator].length; i++) {
		if(mouseX >= pointsX[curveIterator][i]-10 & mouseX <= pointsX[curveIterator][i]+10 & mouseY >= pointsY[curveIterator][i]-10 & mouseY <= pointsY[curveIterator][i]+10){
		ok = false
		}
	}
	if(ok & mouseX > board[0] & mouseX < board[1] & mouseY > board[2] & mouseY < board[3]){ //se o mouse ta dentro do quadrado, pode adicionar o ponto
		if (mouseButton === LEFT) 
				pointsX[curveIterator][addPointIterator] = mouseX
				pointsY[curveIterator][addPointIterator] = mouseY
				addPointIterator++
			

			
		  
		  
	  
	}
}

    function deCasteljau(points, t) {
    if (points.length == 1) {
        return points[0];
    }
	var newPoints = [];
	for (var i = 0; i < points.length - 1; i++) {
		let vector = 0
		vector += (points[i] * ( 1 - t))
		vector += (points[i + 1] * t)
		newPoints.push(vector);
	}
	return deCasteljau(newPoints, t);
}

  function drawCurve(index) {
	let beziersX = []
	let beziersY = []
	beziersX.push(pointsX[index][0])
	beziersY.push(pointsY[index][0])
	for (t = 0; t < 1; t += avaliacoes) {
		var x = deCasteljau(pointsX[index], t)
		beziersX.push(x)
		var y = deCasteljau(pointsY[index], t)
		beziersY.push(y)
	}

	beziersX.push(pointsX[index][pointsX[index].length-1])
	beziersY.push(pointsY[index][pointsY[index].length-1])

	for (let i = 0; i < beziersX.length-1 && pintarCurva && beziersX.length >=3 ; i++) { //percorre o array de pontos gerados pela funcao de casteljau e desenha linhas entre eles
		if(index == curveIterator){
			stroke(255,0,0)
		}else{
			stroke(colors[index]);
		}
		
		strokeWeight(4);
		line(beziersX[i], beziersY[i], beziersX[i+1], beziersY[i+1])
		strokeWeight(1);
		stroke(0);
	}
  }

  //para mover os pontos de controle
  function mouseDragged(){
	if(mouseX > board[0] & mouseX < board[1] & mouseY > board[2] & mouseY < board[3]){ //verifica se o mouse ta dentro do quadro
	  for (let i = 0; i < pointsX[curveIterator].length; i++) {
		  if(lastX >= pointsX[curveIterator][i]-10 & lastX <= pointsX[curveIterator][i]+10 & lastY >= pointsY[curveIterator] [i]-10 & lastY <= pointsY[curveIterator][i]+10){ //varre todos os pontos e preocura o q o mouse ta dentro do circulo
			pointsX[curveIterator][i] += (mouseX - lastX)
			pointsY[curveIterator][i] += (mouseY - lastY)
			break
		  }
	  }
	  lastX = mouseX
	  lastY = mouseY
  }
}

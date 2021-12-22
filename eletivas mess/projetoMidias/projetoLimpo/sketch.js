text = ""

var setup = function () {
  createCanvas(100, 0);
  background('grey');
  let inp = createInput('');
  inp.position(0, 0);
  inp.size(1000);
  inp.input(myInputEvent);
  
  button = createButton('click me');
  button.position(0, 100);
  button.mousePressed(generate);

};

var draw = function () {
  // your code goes here
};

function myInputEvent() {
  text = this.value()
}

function generate(){
  let order = 8;
  let ngrams = [];

  for (let index = 0; index <= text.length - order; index++) {
    const gram = text.substring(index, index + order);
    try {
      if(!ngrams[gram]){
        ngrams[gram] = []
        ngrams[gram].push(text.charAt(index + order))
      }else{
        ngrams[gram].push(text.charAt(index + order))
      }
      
    } catch (error) {
      
    }

  }
  
  let current = text.substring(0,  order);
  let result = current;

  let size = 4000
  for (let index = 0; index < size; index++) {
    let possibilities = ngrams[current];
    let next = random(possibilities);
    result += next
    current = result.substring(result.length - order, result.length);
  }

  createP(result)
}
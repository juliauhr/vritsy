
var currentLayer=0;
var mouseDown = false;

for(var k=0; k<10; k++){//loop over vertical layer grids
  for(var j=0; j<10; j++){//loop over rows
    for(var i=0; i<10; i++){//loop over columns
      var z = k-10;
      document.querySelector('#grid'+j).innerHTML+="<div id='sq"+i+j+z+"' class='square' xpos='"+i+"' zpos='"+z+"' ypos='"+j+"'></div>";
    }
  }
}

var squares = document.getElementsByClassName("square");

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', addBox, false);
  //squares[i].addEventListener('mouseenter', addBox, false);
  squares[i].addEventListener('mouseover', boxHover, false);
  squares[i].addEventListener('mouseout', boxUnhover, false);
  squares[i].block=false;
}

var buttons = document.getElementsByClassName("gridButton");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', changeLayer, false);
  buttons[i].block=false;
}

function changeLayer(){
  var currentLayerButton = document.querySelector('#grid'+currentLayer+'button');
  currentLayerButton.setAttribute('class','gridButton');
  var currentGrid = document.querySelector('#grid'+currentLayer);
  currentLayer = this.getAttribute('layer');

  currentLayerButton = document.querySelector('#grid'+currentLayer+'button');
  currentLayerButton.setAttribute('class','gridButton selectedButton');
  var currentGrid = document.querySelector('#grid'+currentLayer);
  currentGrid.style="display:inline-block; opacity:1; z-index:100";

  for(var i=0; i<10; i++){
    if(i<currentLayer){
      document.querySelector('#grid'+i).style="display:inline-block; opacity:.15; z-index:"+(i);
    }else if(i>currentLayer){
      document.querySelector('#grid'+i).style.display='none';
    }
  }
}

var colors=['deeppink','teal','orangered','forestgreen','pink','grey','powderblue','purple','gainsboro','chartreuse','black','crimson','olive','cyan','gold','darkorange']
var currentColor = colors[0];

for(var i=0; i<colors.length; i++){
  document.querySelector('#colorPicker').innerHTML+="<div class='color' id='color"+i+"' color='"+colors[i]+"'></div>";
  document.querySelector('#color'+i).style.backgroundColor = colors[i];
}

var cols = document.getElementsByClassName("color");

for (var i=0; i < cols.length; i++) {
  cols[i].addEventListener('click', setColor, false);
}

function setColor(){
  currentColor = this.getAttribute('color');
}

function boxHover(){
  this.style.border="3px solid "+currentColor;
}
function boxUnhover(){
  this.style.border="1px solid gainsboro";
}

document.querySelector('#teleporterSq').addEventListener('click', setColor, false);


function viewCode(){
  var div = document.querySelector('#codeDiv');
  var button = document.querySelector('#viewCodeButton');
  if(div.style.display =='block'){
    div.style.display = 'none';
    button.innerHTML = 'View code';
  }else{
    div.style.display = 'block';
    button.innerHTML = 'Hide code';
  }
}

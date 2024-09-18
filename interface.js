var currentLevel = 0;
var levelCount = 0;
var currentLayer=0;
var mouseDown = false;
var ops = document.querySelector("#colorOptions");
var colors=['deeppink','teal','orangered','forestgreen','pink','grey','powderblue','purple','gainsboro','chartreuse','slateblue','crimson','olive','cyan','gold','darkorange']
var blockInteractions = ['clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker','clicker',];
var currentColor = colors[0];
var cols = document.getElementsByClassName("color");
var gridSquares=[];

function makeLevel(updating){
  levelCount++;
  currentLevel=levelCount;
  var num = currentLevel;
  var cont = document.querySelector('#levelContainer');
  cont.innerHTML+='<div id="level'+num+'" class="level"></div>';
  var div = document.querySelector('#level'+num);
  div.innerHTML="";
  for(var i=0; i<10; i++){
    div.innerHTML += '<div id="gridL'+num+i+'" class="grid L'+num+'"></div>';
  }
  document.querySelector('#levelPicker').innerHTML += '<option value="'+num+'">Room '+num+'</option>';
  makeGrid(num);
  document.querySelector('#levelPicker').value = num;
  if(!updating){
    var newLevel = document.createElement('a-entity');
    newLevel.setAttribute('class','vrLevel');
    newLevel.setAttribute('id','vrLevel'+num);
    var newBoxCont = document.createElement('a-entity');
    newBoxCont.setAttribute('id','boxContainer'+num);
    newBoxCont.setAttribute('position','-5 0 0');
    newLevel.appendChild(newBoxCont);
    document.querySelector('#aframeScene').appendChild(newLevel);
    gameText = gameText.replace("<!--templateStart-->",'<!--templateStart-->\n<a-entity id="level'+num+'" class="level">\n</a-entity>');
    document.querySelector('#text-val').value = gameText;
    setLevel();
  }
  //setLevel();
}



function makeGrid(levelNum){
  for(var k=0; k<10; k++){//loop over vertical layer grids
    for(var j=0; j<10; j++){//loop over rows
      for(var i=0; i<10; i++){//loop over columns
        var z = k-10;
        var id = "sq"+levelNum+"-"+i+"-"+j+"-"+k;
        document.querySelector('#gridL'+levelNum+j).innerHTML+="<div id='"+id+"' class='square' xpos='"+i+"' zpos='"+z+"' ypos='"+j+"'></div>";
        gridSquares.push({num:id, occupied:false});
      }
    }
  }
  document.querySelector('#gridL'+levelNum+0).style.display="inline-block";
  makeGridsClickable(levelNum);
}


function setLevel(){
  var levs = document.querySelectorAll('.level');
  for(var i=0; i<levs.length; i++){
    levs[i].style.display='none';
  }
  var lp = document.querySelector('#levelPicker');
  currentLevel = lp.value;
  document.querySelector('#level'+currentLevel).style.display = "inline-block";
  var vrlevs = document.querySelectorAll('.vrLevel');
  for(var i=0; i<vrlevs.length; i++){
    vrlevs[i].object3D.visible = false;
  }
  document.querySelector('#vrLevel'+currentLevel).object3D.visible = true;
  document.querySelector('#grid'+currentLayer+'button').setAttribute('class','gridButton');
  currentLayer=0;
  document.querySelector('#grid'+currentLayer+'button').setAttribute('class','selectedButton gridButton');
  arrangeGrids();

  var levelKids = document.querySelector('#boxContainer'+currentLevel).childNodes;
    for(var i=0; i<levelKids.length; i++){
      if(levelKids[i].className=="startPos"){
        var target = new THREE.Vector3();
        levelKids[i].object3D.getWorldPosition(target);
        document.querySelector('#rig').setAttribute('position',target);
      }
    }
}


function makeGridsClickable(levelNum){
  var layers = document.querySelector('#level'+levelNum).childNodes;
  var squares = document.getElementsByClassName("square");
    for(var j=0; j<squares.length; j++){
      squares[j].addEventListener('click', addSomething, false);
      squares[j].addEventListener('mouseover', boxHover, false);
      squares[j].addEventListener('mouseout', boxUnhover, false);
      squares[j].block=false;
    }
  var buttons = document.getElementsByClassName("gridButton");
  for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', changeLayer, false);
  }
}


function changeLayer(){
  var currentLayerButton = document.querySelector('#grid'+currentLayer+'button');
  currentLayerButton.setAttribute('class','gridButton');
  var currentGrid = document.querySelector('#gridL'+currentLevel+currentLayer);
  currentLayer = this.getAttribute('layer');
  currentLayerButton = document.querySelector('#grid'+currentLayer+'button');
  currentLayerButton.setAttribute('class','gridButton selectedButton');
  arrangeGrids();
}

function arrangeGrids(){
  var currentGrid = document.querySelector('#gridL'+currentLevel+currentLayer);
  currentGrid.style="display:inline-block; opacity:1; z-index:100";
  for(var i=0; i<10; i++){
    if(i<currentLayer){
      document.querySelector('#gridL'+currentLevel+i).style="display:inline-block; opacity:.15; z-index:"+(i);
    }else if(i>currentLayer){
      document.querySelector('#gridL'+currentLevel+i).style.display='none';
    }
  }
}

for(var i=0; i<colors.length; i++){
  document.querySelector('#colorPicker').innerHTML+="<div class='color' id='color"+i+"' color='"+colors[i]+"'></div>";
  document.querySelector('#color'+i).style.backgroundColor = colors[i];
}


for (var i=0; i < cols.length; i++) {
  cols[i].addEventListener('click', setColor, false);
}

function setColor(){
  addingDoor = false;
  addingStart = false;
  addingTeleporter = false;
  currentColor = this.getAttribute('color');
  this.style.border='2px solid white';
  this.addEventListener('transitionend', () => {
    this.style.border='0px solid white';
  });
  ops.style.display = 'block';
  ops.style.border = '7px solid '+currentColor;
  ops.style.backgroundColor = currentColor;
  ops.style.height = '80px';
  var num = colors.indexOf(currentColor);
  var int = blockInteractions[num];
  document.querySelector('#'+int).checked = true;
}

function setDoor(){
  addingDoor=true;
  addingTeleporter=false;
  addingStart=false;
  document.querySelector('#doorButton').style.border='3px solid black';
  this.addEventListener('transitionend', () => {
    document.querySelector('#doorButton').style.border='1px solid black';
  });
  ops.style.display='none';
}

function setStart(){
  addingStart=true;
  addingTeleporter=false;
  addingDoor=false;
  document.querySelector('#startButton').style.border='3px solid black';
  this.addEventListener('transitionend', () => {
    document.querySelector('#startButton').style.border='1px solid black';
  });
  ops.style.display='none';
}

function setTeleport(){
  addingTeleporter=true;
  addingStart=false;
  addingDoor=false;
  document.querySelector('#teleporterButton').style.border='3px solid black';
  this.addEventListener('transitionend', () => {
    document.querySelector('#teleporterButton').style.border='1px solid black';
  });
  ops.style.display='none';
}


function boxHover(){
  if(addingStart||addingDoor||addingTeleporter){
    this.style.border="3px dotted black";
  }else{
    this.style.border="3px solid "+currentColor;
  }
}
function boxUnhover(){
  this.style.border="1px solid gainsboro";
}



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


function changeRadio(option){
  var num = colors.indexOf(currentColor);
  blockInteractions[num]=option;
  var boxes = document.querySelectorAll('.'+currentColor+'box');
  for(var i=0; i<boxes.length; i++){
    if(document.querySelector("#clickerRad").checked){
      alert('clicker')
      boxes[i].removeAttribute('destroy');
      boxes[i].setAttribute('clicker','');
    }else if(document.querySelector("#destroyRad").checked){
      alert('destroy')
      boxes[i].removeAttribute('clicker');
      boxes[i].setAttribute('destroy','');
    }else if(document.querySelector("#noneRad").checked){
      alert('none')
      boxes[i].removeAttribute('clicker');
      boxes[i].removeAttribute('destroy');
    }
  }
}

/*function setColorToClicker(){
  var boxes = document.querySelectorAll('.'+currentColor+'box');
  for(var i=0; i<boxes.length; i++){
    boxes[i].removeAttribute('destroy');
    boxes[i].setAttribute('clicker','');
  }
}

function setColorToDestroy(){
  var boxes = document.querySelectorAll('.'+currentColor+'box');
  for(var i=0; i<boxes.length; i++){
    boxes[i].removeAttribute('clicker');
    boxes[i].setAttribute('destroy','');
  }
}*/


//hover text

var telebut = document.querySelector('#teleporterButton');
telebut.addEventListener("mouseenter", function(evt){
  document.querySelector('#teleporterButtonText').style.display='inline';
}, false);
telebut.addEventListener("mouseleave", function(evt){
  document.querySelector('#teleporterButtonText').style.display='none';
}, false);

var startbut = document.querySelector('#startButton');
startbut.addEventListener("mouseenter", function(evt){
  document.querySelector('#startButtonText').style.display='inline';
}, false);
startbut.addEventListener("mouseleave", function(evt){
  document.querySelector('#startButtonText').style.display='none';
}, false);

var doorbut = document.querySelector('#doorButton');
doorbut.addEventListener("mouseenter", function(evt){
  document.querySelector('#doorButtonText').style.display='inline';
}, false);
doorbut.addEventListener("mouseleave", function(evt){
  document.querySelector('#doorButtonText').style.display='none';
}, false);

var codebut = document.querySelector('#text-val');
codebut.addEventListener("mouseenter", function(evt){
  document.querySelector('#codeButtonText').style.display='inline';
}, false);
codebut.addEventListener("mouseleave", function(evt){
  document.querySelector('#codeButtonText').style.display='none';
}, false);

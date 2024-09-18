var addingDoor = false;
var addingStart = false;
var addingTeleporter = false;

function addSomething(){
  var id = this.id;
  for(var i=0; i<gridSquares.length; i++){
    if(gridSquares[i].num == id){
      if(gridSquares[i].occupied){
        deleteBlock(this);
        deleteBlockText(this);
      }else{
        if(addingStart){
          addStart(this);
        }else if(addingTeleporter){
          addTeleporter(this);
        }else if(addingDoor){
          addDoor(this);
        }else{
          addBox(this);
        }
      }
      gridSquares[i].occupied = !gridSquares[i].occupied;
      break;
    }
  }
}

function addStart(sq){
  //var block = sq.block;
  var id = sq.getAttribute('id');
  var x = sq.getAttribute('xpos');
  var z = sq.getAttribute('zpos');
  var y = sq.getAttribute('ypos');
  //if(!block){
    //sq.block = true;
  sq.style.backgroundImage = "url('https://cdn.glitch.com/f5a44d39-2edb-408d-80a9-bc731e88ab49%2FstartButton.PNG?v=1619284485519')";
  sq.style.backgroundSize = "cover";
  var newCyl = document.createElement('a-cylinder');
  newCyl.setAttribute('start', '');
  newCyl.setAttribute('scale', '.5 .1 .5');
  newCyl.setAttribute('open-ended','true');
  newCyl.setAttribute('material', 'color:black; side:double');
  newCyl.setAttribute('position',x+' '+(y-.5)+' '+z);
  newCyl.setAttribute('id', 'box'+id);
  newCyl.setAttribute('shadow', '');
  newCyl.setAttribute('class', 'startPos');
  document.querySelector("#boxContainer"+currentLevel).appendChild(newCyl);
  addStartText(x, y, z);
  //}
}

function addTeleporter(sq){
  //var block = sq.block;
  var id = sq.getAttribute('id');
  var x = sq.getAttribute('xpos');
  var z = sq.getAttribute('zpos');
  var y = sq.getAttribute('ypos');
  //if(!block){
    //sq.block = true;
  sq.style.backgroundImage = "url('https://cdn.glitch.com/f5a44d39-2edb-408d-80a9-bc731e88ab49%2FteleporterButton.PNG?v=1619284493151')";
  sq.style.backgroundSize = "cover";
  var newBox = document.createElement('a-box');
  newBox.setAttribute('teleporter', '');
  newBox.setAttribute('scale', '.3 .3 .3');
  newBox.setAttribute('rotation', '45 0 45');
  newBox.setAttribute('material','wireframe:true');
  newBox.setAttribute('color', 'black');
  newBox.setAttribute('position',x+' '+y+' '+z);
  newBox.setAttribute('id', 'box'+id);
  newBox.setAttribute('shadow', '');
  document.querySelector("#boxContainer"+currentLevel).appendChild(newBox);
  addTeleporterText(x, y, z);
  //}
}



function addDoor(sq){
  //var block = sq.block;
  var id = sq.getAttribute('id');
  var x = sq.getAttribute('xpos');
  var z = sq.getAttribute('zpos');
  var y = sq.getAttribute('ypos');
  //if(!block){
    //sq.block = true;
    sq.style.backgroundImage = "url('https://cdn.glitch.com/f5a44d39-2edb-408d-80a9-bc731e88ab49%2FdoorButton.PNG?v=1619284482440')";
    sq.style.backgroundSize = "cover";
    var newDoor = document.createElement('a-entity');
    newDoor.setAttribute('door', '');
    newDoor.setAttribute('position',x+' '+(y-.5)+' '+z);
    newDoor.setAttribute('id', 'box'+id);
    newDoor.setAttribute('shadow', '');
    var newBoxL = document.createElement('a-box');
    newBoxL.setAttribute('scale','.1 1.5 .2');
    newBoxL.setAttribute('position','-.4 .75 0');
    newBoxL.setAttribute('color','black');
    var newBoxR = document.createElement('a-box');
    newBoxR.setAttribute('scale','.1 1.5 .2');
    newBoxR.setAttribute('position','.4 .75 0');
    newBoxR.setAttribute('color','black');
    var newBoxT = document.createElement('a-box');
    newBoxT.setAttribute('scale','1.2 .2 .3');
    newBoxT.setAttribute('position','0 1.4 0');
    newBoxT.setAttribute('color','black');
    var newBoxM = document.createElement('a-box');
    newBoxM.setAttribute('scale','.8 1.4 .1');
    newBoxM.setAttribute('position','0 .7 0');
    newBoxM.setAttribute('material','color:cyan; opacity:.3');
    newDoor.appendChild(newBoxL);
    newDoor.appendChild(newBoxR);
    newDoor.appendChild(newBoxT);
    newDoor.appendChild(newBoxM);
    document.querySelector("#boxContainer"+currentLevel).appendChild(newDoor);
    addDoorText(x, y, z);
  //}
}

function addBox(sq){
  var id = sq.getAttribute('id');
  var x = sq.getAttribute('xpos');
  var z = sq.getAttribute('zpos');
  var y = sq.getAttribute('ypos');
  sq.style.backgroundColor = currentColor;
  var newBox = document.createElement('a-box');
  var int = blockInteractions[colors.indexOf(currentColor)];
  if(int == 'clicker'){
    newBox.setAttribute('clicker', '');
  }
  if(int == 'destroy'){
    newBox.setAttribute('destroy', '');
  }
  newBox.setAttribute('color', currentColor);
  newBox.setAttribute('position',x+' '+y+' '+z);
  newBox.setAttribute('id', 'box'+id);
  newBox.setAttribute('class', currentColor+'box');
  newBox.setAttribute('shadow', '');
  document.querySelector("#boxContainer"+currentLevel).appendChild(newBox);
  addBoxText(x, y, z);
};

function deleteBlock(sq){
  var id = sq.id;
  //sq.block = false;
  var col = sq.style.backgroundColor;
  sq.style.backgroundImage="";
  sq.style.backgroundColor="transparent";
  var box = document.querySelector('#box'+id);
  box.parentNode.removeChild(box);
  //removeBoxText(x, y, z, col);
}





function addBoxText(x, y, z){
  gameText = document.querySelector('#text-val').value;
  var comp = 'clicker';
  gameText = gameText.replace('<a-entity id="level'+currentLevel+'" class="level">','<a-entity id="level'+currentLevel+'" class="level">\n<a-box position="'+x+' '+y+' '+z+'" color="'+currentColor+'" '+comp+'></a-box>');
  document.querySelector('#text-val').value=gameText;
}

function addDoorText(x, y, z){
  var comp = 'scale="1 1.5 .2" material="color:black; opacity:.3" door';
  gameText = gameText.replace('<a-entity id="level'+currentLevel+'" class="level">','<a-entity id="level'+currentLevel+'" class="level">\n<a-box position="'+x+' '+y+' '+z+'" color="black" '+comp+'></a-box>');
  document.querySelector('#text-val').value = gameText;
}

function addStartText(x, y, z){
  var comp = 'scale=".5 .02 .5" material="color:black; side:double" open-ended="true" class="startPos"';
  gameText = gameText.replace('<a-entity id="level'+currentLevel+'" class="level">','<a-entity id="level'+currentLevel+'" class="level">\n<a-cylinder position="'+x+' '+y+' '+z+'" '+comp+'></a-cylinder>');
  document.querySelector('#text-val').value = gameText;
}

function addTeleporterText(x, y, z){
  var comp = 'scale=".3 .3 .3" rotation="45 0 45" material="color:black; wireframe:true" teleporter';
  gameText = gameText.replace('<a-entity id="level'+currentLevel+'" class="level">','<a-entity id="level'+currentLevel+'" class="level">\n<a-box position="'+x+' '+y+' '+z+'" color="black" '+comp+'></a-box>');
  document.querySelector('#text-val').value = gameText;
}

/*function removeBoxText(x, y, z, col){
  gameText = document.querySelector('#text-val').value;
  var strStart = '\n<a-box position="'+x+' '+y+' '+z;
  var strEnd = '</a-box>';
  var reg = new RegExp(strStart + '.*' + strEnd);
  gameText = gameText.replace(reg, '');
  document.querySelector('#text-val').value = gameText;
}*/

function deleteBlockText(sq){
  var x = sq.getAttribute('xpos');
  var y = sq.getAttribute('ypos');
  var z = sq.getAttribute('zpos');
  var pos = 'position="'+x+' '+y+' '+z+'"';
  var exp = new RegExp('<'+'.*'+pos+'.*'+'>\n');
  gameText = gameText.replace(exp, '');
  document.querySelector('#text-val').value = gameText;
}


//---------components-----------------------------------


AFRAME.registerComponent('clicker', {
  init: function () {
      var el = this.el;
      el.addEventListener('click', function (evt) {
        var face = evt.detail.intersection.faceIndex;
        if(face==0 || face==1){
          el.object3D.position.x -= 1;
        }else if(face==2 || face==3){
          el.object3D.position.x += 1;
        }else if(face==4 || face==5){
          el.object3D.position.y -= 1;
        }else if(face==6 || face==7){
          el.object3D.position.y += 1;
        }else if(face==8 || face==9){
          el.object3D.position.z -= 1;
        }else if(face==10 || face==11){
          el.object3D.position.z += 1;
        }
      });
   }});


AFRAME.registerComponent('destroy', {
  init: function () {
      var el = this.el;
      el.addEventListener('click', function (evt) {
        el.parentNode.removeChild(el);
      });
   }});

var targetPos = new THREE.Vector3();
AFRAME.registerComponent('teleporter', {
  init: function () {
      var el = this.el;
      el.addEventListener('click', function (evt) {
        el.object3D.getWorldPosition(targetPos);
        //document.querySelector('#rig').setAttribute('position',targetPos);
        document.querySelector('#rig').object3D.position = targetPos;
      });
   }});


AFRAME.registerComponent('door', {
  init: function () {
      var el = this.el;
      el.addEventListener('click', function (evt) {
        var lp = document.querySelector('#levelPicker');
        if(parseInt(currentLevel)+1 > lp.length){
          alert("No more rooms")
        }else{
          currentLevel++;
          lp.value = currentLevel;
          var bub = document.querySelector('#headBubble');
          bub.emit('fade');
          setTimeout(function(){setLevel()}, 2000);
          //var levelKids = document.querySelector('#boxContainer'+currentLevel).childNodes;
          //for(var i=0; i<levelKids.length; i++){
            //if(levelKids[i].className=="startPos"){
              //var target = new THREE.Vector3();
              //levelKids[i].object3D.getWorldPosition(target);
              //document.querySelector('#rig').setAttribute('position',target);
            //}
          //}
        }
      });
   }});

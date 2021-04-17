
function addBox(){
  //if(mouseDown){
  var block = this.block;
  var id = this.getAttribute('id');
  var x = this.getAttribute('xpos');
  var z = this.getAttribute('zpos');
  var y = this.getAttribute('ypos');
  if(!block){
    this.block = true;
    this.style.backgroundColor = currentColor;
    var newBox = document.createElement('a-box');
    if(currentColor=='black'){
      //var newInnerBox = document.createElement('a-box');
      //newInnerBox.setAttribute('color','white');
      //newInnerBox.setAttribute('scale','.2 .2 .2');
      //newBox.appendChild(newInnerBox);
      newBox.setAttribute('teleporter', '');
      newBox.setAttribute('scale', '.3 .3 .3');
      newBox.setAttribute('rotation', '45 0 45');
      //newBox.setAttribute('opacity', '.3');
      newBox.setAttribute('material','wireframe:true');
    }else{
      newBox.setAttribute('clicker', '');
    }
    newBox.setAttribute('color', currentColor);
    newBox.setAttribute('position',x+' '+y+' '+z);
    newBox.setAttribute('id', 'box'+id);
    newBox.setAttribute('shadow', '');
    document.querySelector("#boxContainer").appendChild(newBox);
    addBoxText(x, y, z);
  }else{
    this.block = false;
    var col = this.style.backgroundColor;
    this.style.backgroundColor="transparent";
    var box = document.querySelector('#box'+id);
    box.parentNode.removeChild(box);
    removeBoxText(x, y, z, col);
  }
  //}
};




function addBoxText(x, y, z){
  gameText = document.querySelector('#text-val').value;
  var comp = 'clicker';
  if(currentColor=='black'){
    comp = 'scale=".3 .3 .3" rotation="45 0 45" material="wireframe:true" teleporter';
  }
  gameText = gameText.replace("<!--templateStartBoxes-->","<!--templateStartBoxes-->\n<a-box position='"+x+" "+y+" "+z+"' color='"+currentColor+"' "+comp+"></a-box>");
  document.querySelector('#text-val').value=gameText;
}

function removeBoxText(x, y, z, col){
  gameText = document.querySelector('#text-val').value;
  var strStart = "\n<a-box position='"+x+" "+y+" "+z;
  var strEnd = "</a-box>";
  var reg = new RegExp(strStart + ".*" + strEnd);
  gameText = gameText.replace(reg, "");
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



var targetPos = new THREE.Vector3();
AFRAME.registerComponent('teleporter', {
  init: function () {
      var el = this.el;
      el.addEventListener('click', function (evt) {
        el.object3D.getWorldPosition(targetPos);
        document.querySelector('#rig').setAttribute('position',targetPos);
      });
   }});

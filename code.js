function updateCode(){
  document.querySelector('body').style.backgroundColor = 'grey';
  var txt = document.querySelector('#text-val').value;
  var start = txt.indexOf("<!--templateStartBoxes-->");
  var end = txt.indexOf("<!--templateEndBoxes-->");
  var str = txt.substring(start, end);
  document.querySelector('#boxContainer').innerHTML = str;
  var boxes = document.getElementsByTagName("a-box");
  var squares = document.getElementsByClassName("square");
  for (var i=0; i<squares.length; i++) {
    squares[i].style.backgroundColor = 'transparent';
  }
  for(var i=0; i<boxes.length; i++){
    var col = boxes[i].getAttribute('color');
    var pos = boxes[i].getAttribute('position');
    var splitPos = pos.replace(/\s/g, '');
    var square = document.querySelector('#sq'+splitPos)
    square.style.backgroundColor=col;
    square.block=true;
    boxes[i].setAttribute('id','boxsq'+splitPos);
    if(col=='black'){
      boxes[i].setAttribute('material','wireframe:true');
      boxes[i].setAttribute('scale','.3 .3 .3');
      boxes[i].setAttribute('rotation','45 0 45');
      boxes[i].setAttribute('teleporter','');
    }else{
      boxes[i].setAttribute('clicker','');
    }
  }
  gameText = document.querySelector('#text-val').value;
  document.querySelector('body').style.backgroundColor = 'white';
}



var startBoilerplate="<head>\n"
  +'<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>\n'
  +"<script>\n"
  +"AFRAME.registerComponent('clicker', {\n"
  +"init: function () {\n"
  +"var el = this.el;\n"
  +"el.addEventListener('click', function (evt) {\n"
  +"var face = evt.detail.intersection.faceIndex;\n"
  +"if(face==0 || face==1){\n"
  +"el.object3D.position.x -= 1;\n"
  +"}else if(face==2 || face==3){\n"
  +"el.object3D.position.x += 1;\n"
  +"}else if(face==4 || face==5){\n"
  +"el.object3D.position.y -= 1;\n"
  +"}else if(face==6 || face==7){\n"
  +"el.object3D.position.y += 1;\n"
  +"}else if(face==8 || face==9){\n"
  +"el.object3D.position.z -= 1;\n"
  +"}else if(face==10 || face==11){\n"
  +"el.object3D.position.z += 1;\n"
  +"}\n"
  +"});\n"
  +"}});\n"
  +"\n"
  +"var targetPos = new THREE.Vector3();\n"
  +"AFRAME.registerComponent('teleporter', {\n"
  +"init: function () {\n"
  +"var el = this.el;\n"
  +"el.addEventListener('click', function (evt) {\n"
  +"el.object3D.getWorldPosition(targetPos);\n"
  +"document.querySelector('#rig').setAttribute('position',targetPos);\n"
  +"});\n"
  +"}});\n"
  +"</script>\n"
  +"</head>\n"
  +"\n"
  +"<body>\n"
  +'<a-scene background="color:powderblue">\n'
  +'<a-entity id="boxContainer" position="-5 0 0" scale="1 1 1">\n'

var gameText = "<!--templateStartBoxes-->\n"
  +"<!--templateEndBoxes-->\n"

var endBoilerplate="</a-entity>\n"
  +'<a-plane scale="10 10" position="-.5 -.5 -5.5" rotation="-90 0 0" color="green"></a-plane>\n'
  +'<a-entity id="rig" position="0 0 0">\n'
  +'<a-camera id="camera" cursor="rayOrigin: mouse"></a-camera>\n'
  +'<a-entity oculus-touch-controls="hand: left"></a-entity>\n'
  +'<a-entity laser-controls="hand:right" raycaster="objects:a-box; far:100;"></a-entity>\n'
  +"</a-entity>\n"
  +"</a-scene>\n"
  +"</body>\n"



document.querySelector('#text-val').value=gameText;


function download(filename, text) {
    var txt = startBoilerplate+text+endBoilerplate;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById("downloadButton").addEventListener("click", function(){
    var text = document.getElementById("text-val").value;
    var filename = "myGame.html";
    download(filename, text);
}, false);

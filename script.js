const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let  cw = canvas.width;
let  ch = canvas.height;
let levelY = 20;
let midTonePos = 0.8;
let Ypos= 100;
//let cw = 1920;
//let ch = 1080;
let baseTone = "#ffffff";
let midTone = "#000000";
let topTone = "#ffffff";
let BGColor = "#000000";

let loopStart = 0;
let loopCount = 0;
let loopGap = 0;

function resizeCanvas(){
  cw = document.getElementById("width").value;
  canvas.width = cw; 
  ch = document.getElementById("height").value;
  canvas.height = ch;
  document.getElementById("CanvasPreset").value = 0;
  test();
}

function resizeCanvasPreset(){ 
  let dimms = String(document.getElementById("CanvasPreset").value).split('x')
  console.log(dimms[1]);
  cw = dimms[0];
  canvas.width = cw;
  document.getElementById("width").value = cw; 
  ch = dimms[1];
  canvas.height = ch;
  document.getElementById("height").value = ch;
  test();
}

function getmidTonePosValue() {
  // Selecting the input element and get its value 
  midTonePos = 1-Number(document.getElementById("midTonePos").value);
  test();
}
function getYValue() {
  // Selecting the input element and get its value 
  Ypos = Number(document.getElementById("y").value);
  test();
}

function getToneValues() {
  // Selecting the input element and get its value 
  baseTone = document.getElementById("baseTone").value;
  midTone = document.getElementById("midTone").value;
  topTone = document.getElementById("topTone").value;
  BGColor = document.getElementById("BGColor").value;
  test();
}

function getLoopValues() {
  loopStart = Number(document.getElementById("loopStart").value);
  loopCount = Number(document.getElementById("loopCount").value);
  loopGap = Number(document.getElementById("loopGap").value);
  test();
}

function test(){
  console.log(cw,ch)
  //ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = BGColor;
  ctx.fillRect(0,0,cw,ch);

  for( let waveIndex = 0; waveIndex <= loopCount; waveIndex+=1){
    console.log(`waveIndex is ${waveIndex}`);
    console.log(`loopCount is ${loopCount}`);
    let levelY = Number(loopStart*ch) + waveIndex * (ch/10) * loopGap;
    console.log(`levelY is ${levelY}`);
    
    let points = [
      {x : 0-50   ,y : levelY},  //outside of edge + random variation so edge isn't shown
      {x : cw*.1  ,y : Number(levelY)+Number(Ypos)},
      {x : cw*.3  ,y : levelY},  
      {x : cw*.5  ,y : Number(levelY)+Number(Ypos*0.5)},
      {x : cw*.7  ,y : levelY},
      {x : cw*.9  ,y : Number(levelY)+Number(Ypos*1.5)},
      {x : Number(cw)+Number(50)  ,y : levelY}
    ];
    //console.log(points[points.length-1].x);
    for (let j = 0; j<points.length;j++){
      points[j].y = Number(points[j].y)+Number(Math.random()*20-10);
      points[j].x = Number(points[j].x)+Number(Math.random()*20-10);
    }

    let grd = ctx.createLinearGradient(0, levelY, 0, Number(ch)+Number(100)); 
    grd.addColorStop(1, baseTone);
    grd.addColorStop(midTonePos, midTone);
    grd.addColorStop(0, topTone);
    ctx.fillStyle = grd;

    ctx.beginPath();  
    ctx.moveTo(points[0].x, points[0].y);
    for (i = 1; i < points.length - 2; i ++){
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    // curve through the last two points
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
    //ctx.stroke();
    ctx.lineTo(cw,levelY);
    ctx.lineTo(cw,ch);
    ctx.lineTo(0,ch);
    ctx.lineTo(0,levelY);
    ctx.closePath();
    ctx.fill();
    //ctx.strokeStyle = 'White';
    //ctx.stroke();
  }
}

var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

getToneValues();
getLoopValues();
//test(); test called by others^
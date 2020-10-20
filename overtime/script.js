document.getElementById("main").addEventListener("click", function(){
    window.location.href = "../index.html";
  });

document.getElementById("time").addEventListener("click", function(){
window.location.href = "../main/index.html";
});

document.getElementById("high").addEventListener("click", function(){
    window.location = "#highlights";
  });

  document.getElementById("source").addEventListener("click", function(){
    window.location = "#sources";
  });

var title = "A Brief History of Diversity in Film";
var datatitle = "Data Highlights";
var counter = 0;

function preload() {
    font = loadFont('assets/barlow.otf');
}

function setup() {
  var cnv = createCanvas(900, 200);
  frameRate(20);
  console.log("HELLO PLS");
  cnv.parent('sketchholder');
  cnv.position(0,0);
}

function draw() {
    background(0);
    fill(255);
    noStroke();
    textFont(font);
    textSize(40);
    typewriteText(title, 50, 80);

    // typewriteText(datatitle, 50, 2450);
}

function typewriteText(textt,x,y) {
    // if (counter < textt.length){
    //   counter++;
    //   text(textt.substring(0, counter), 50,80);
    // }
    text(textt.substring(0, 80), x, y);
    
}

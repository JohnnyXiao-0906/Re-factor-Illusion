let speed = 3;
let lines = 100;
let light = 1;
let shining = false;

class Point{
  constructor(x = random(width), y=random(height)){
    this.x = x;
    this.y = y;
    this.speed = random(1, 2);
    this.angle = random(TAU);
    this.angleMod = random() < .5 ? 1 : -1;
  }
  update(){
    this.x = constrain(this.x + cos(this.angle)*this.speed, 0, width);
    this.y = constrain(this.y + sin(this.angle)*this.speed, 0, height);
    this.angle += .05*this.angleMod;
    if (random() < .05) this.angleMod *= -1;    
  }
  lerpTo(p){
    this.x = lerp(this.x, p.x, .01);
    this.y = lerp(this.y, p.y, .01);
  }
}

function setup (){
  pixelDensity(1);
  canvas = createCanvas(500,500);
  blendMode(ADD);
  colorMode(HSB, 1, 1, 1);
  windowResized();

  //canvas.parent("sketch-container");
  addGUI();
}

let points = [];

function init(){
  //clear();
  points = [];
  for (let i = 0; i < lines; i++) points.push(new Point());
}

function draw(){
  if(light > 0 ){

    //Add shining
    light++;


  }else{
    shining = false;
     button.html("SHINE");
     button.removeClass("inactive");
  }

  for (let n = 0; n < speed; n++){
    for (let i = 0; i < points.length; i += 2){
      let p  = points[i];
      let p2 = points[i+1];
      stroke(i/light, light, light, .05);
      line(p.x, p.y, p2.x, p2.y);
      p.lerpTo(p2);
      p2.lerpTo(p);
    }
    points.map(p => p.update())
  }
  
}

// function mousePressed(){
//   windowResized()
// }

function windowResized(){
  resizeCanvas(windowWidth, windowHeight); 
  init();
}

function addGUI()
{

  //add a button
  
  button = createButton("SHINE");
  button.parent("gui-container");
  
  button.addClass("button");
  
  // button.style("color","red");

  button.mousePressed(handleButtonPress);
}

function handleButtonPress(){
  if(!shining){
    shining = true;  
    light ++;

      console.log("Pressed");
    
    button.html("SHINING");
    
    button.addClass("inactive");
  
  }

}


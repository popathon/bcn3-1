var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;


var img;
var imgWidth;
var imgHeight;

function preload() {
  img1 = loadImage("img/foto-1.jpg");
  audio1 = loadSound("audio/audio-1.mp3");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // set image attributes
  imgWidth = 347;
  imgHeight = 208;
  
  // Create objects
  piece1 = new PuzzelPiece(img1, audio1, 0, 0);
  
  // audioOne = new AudioPiece(audio1);
}

function draw() {
  // console.log("draw!!!");
  background(200, 200, 200);
  piece1.run();
}

// Image class
function PuzzelPiece(img, audio, coordX, coordY) {
  this.img = img;
  this.audio = audio;

  this.width = imgWidth;
  this.height = imgHeight;

  this.hovered = false;

  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(random(0, windowWidth), random(0, windowHeight));


  this.run = function () {
    console.log("run!!!");
    this.update();
    this.checkHovered();
    // this.borders();
    this.display();
  }

  this.update = function () {
    // console.log("update!!!");
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  this.checkHovered = function () {
    if (mouseX >= this.position.x && mouseX < (this.position.x + this.width) && mouseY >= this.position.y && mouseY < (this.position.y + this.height)) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }
  }

  this.moveHome = function () {
    this.position.x = this.coordX * 0.5 * windowWidth;
    this.position.y = this.coordY * 0.5 * windowHeight;
  }

  this.display = function() {
    image(this.img, this.position.x, this.position.y, this.width, this.height);
  }
};

function mouseClicked () {
  // console.log(0.5*windowWidth);
  // console.log(0.5*windowHeight);
  console.log("mouseClicked!!!");
  if (piece1.hovered) {
    console.log("hovered!!!");
    piece1.moveHome();
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
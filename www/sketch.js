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
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // set image attributes
  imgWidth = 347;
  imgHeight = 208;
  
  // Create objects
  imageOne = new ImagePiece(img1);
  imageTwo = new ImagePiece(img1);
  imageThree = new ImagePiece(img1);

  // audioOne = new AudioPiece(audio1);
}

function draw() {
  background(50, 89, 100);
  imageOne.move();
  imageOne.display();

  imageTwo.move();
  imageTwo.display();

  imageThree.move();
  imageThree.display();
}

// Image class
function ImagePiece(thisImage) {
  this.x = random(width);
  this.y = random(height);
  this.width = imgWidth;
  this.height = imgHeight;

  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    image(thisImage, this.x, this.y, this.width, this.height);
  }
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;


var img;
var imgWidth;
var imgHeight;

function preload() {
  // img1 = loadImage("img/foto-1.jpg");
  img1 = loadImage("img/FOTO_A1_sized.jpg");
  img2 = loadImage("img/FOTO_A2_sized.jpg");
  img3 = loadImage("img/FOTO_B1_sized.jpg");
  img4 = loadImage("img/FOTO_B2_sized.jpg");
  
  drawing1 = loadImage("img/painting_A1_sized.png");
  drawing2 = loadImage("img/painting_A2_sized.png");
  drawing3 = loadImage("img/painting_B1_sized.png");
  drawing4 = loadImage("img/painting_B2_sized.png");

  audio1 = loadSound("audio/audio-a1.mp3");
  audio2 = loadSound("audio/audio-a2.mp3");
  audio3 = loadSound("audio/audio-b1.mp3");
  audio4 = loadSound("audio/audio-b2.mp3");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // set image attributes
  imgWidth = 0.5 * windowWidth;
  imgHeight = 0.5 * windowHeight;
  
  // Create objects
  piece1 = new PuzzelPiece(img1, drawing1, audio1, 0, 0);
  piece2 = new PuzzelPiece(img2, drawing2, audio2, 1, 0);
  piece3 = new PuzzelPiece(img3, drawing3, audio3, 0, 1);
  piece4 = new PuzzelPiece(img4, drawing4, audio4, 1, 1);
  
  // audioOne = new AudioPiece(audio1);
}

function draw() {
  // console.log("draw!!!");
  background(200, 200, 200);
  piece1.run();
  piece2.run();
  piece3.run();
  piece4.run();
}

// Image class
function PuzzelPiece(img, drawing, audio, coordX, coordY) {
  this.img = img;
  this.drawing = drawing;
  this.displayImage = this.drawing
  this.audio = audio;

  this.coordX = coordX;
  this.coordY = coordY;

  this.width = imgWidth;
  this.height = imgHeight;

  this.hovered = false;
  this.isHome = false;

  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(random(100, windowWidth-this.width), random(100, windowHeight-this.height));


  this.run = function () {
    // console.log("run!!!");
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
    this.velocity = createVector(0, 0);
    
    this.isHome = true;

    piece1.audio.pause();
    piece2.audio.pause();
    piece3.audio.pause();
    piece4.audio.pause();

    this.audio.play();
  }

  this.display = function () {
    image(this.displayImage, this.position.x, this.position.y, this.width, this.height);
  }

  this.changePic = function () {
    this.displayImage = this.img;
  }
};

function mouseClicked () {
  if (piece1.hovered) {
    piece1.moveHome();
  };
  if (piece2.hovered) {
    piece2.moveHome();
  };
  if (piece3.hovered) {
    piece3.moveHome();
  };
  if (piece4.hovered) {
    piece4.moveHome();
  };
  if (piece1.isHome && piece2.isHome && piece3.isHome && piece4.isHome) {
    console.log("allhome!!!");
    setTimeout(changePics, 3000);
  };
}

function changePics () {
  console.log("changePics!!!");
  piece1.changePic();
  piece2.changePic();
  piece3.changePic();
  piece4.changePic();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
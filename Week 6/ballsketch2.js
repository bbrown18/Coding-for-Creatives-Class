var x = 100;
var y = 200;
var xspeed = 5;
var yspeed = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  

}

function draw() {
  background(66,244,328);
  for (var i=0; i<balls.;ength; i++)
      balls[i].move();
      balls[i].display()
}

function balls(){
    this.x = 100
    this.y = 200
    this.xspeed = 5
    this.yspeed = -3

    this.display: function (){var d = dist(mouseX, mouseY);
  fill (30,45,34)
  rect (x, y, d, d);}

    this.move: function (){ 
      {this.x = this.x + this.xspeed;
     if (this.x > windowWidth || this.x < 0) {
      this.xspeed = -this.xspeed;
    }

    this.bounce: function(){y = y + yspeed;

    if (y > windowHeight || y < 0) {
      yspeed = -yspeed;}
}
}
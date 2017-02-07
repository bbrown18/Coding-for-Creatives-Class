var x = 100;
var y = 200;
var xspeed = 5;
var yspeed = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background (66,244,328);

}

function draw() {

	//distance from center of the screen
  var d = dist(mouseX, mouseY);

  	fill (30,45,34)
  	rect (x, y, d, d);

  	//bouncing horizontally
 	 x = x + xspeed;
  	
  	 if (x > windowWidth || x < 0)  {
     	xspeed = -xspeed;
  	}

  	//bouncing veritcally
  	y = y + yspeed;

  	if (y > windowHeight || y < 0) {
	 	  yspeed = -yspeed;
  	}
    v *= -1 * ballAbsorption

}
$(document).ready(function(){
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  var cw = 10;
  var d;
  var bait;
  var pup = null;
  var snake_length = 5;
  var snake_speed = 60;

  canvas.setAttribute("tabindex", "0");
  canvas.focus();

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = "lime";
  ctx.strokeRect(0,0,w,h);

  var snake_array;
  var wall_array;

  function init()
  {
    d = "right";
    create_snake();
    create_bait();
    snake_length = 5;
    theLoop();
  }

    function pup_timeout(){

    pup_duration = pup_duration - snake_speed;

    if (pup_duration < 1) {
        snake_speed = 60;
        pup_duration = 3000;
      }
    };

  function theLoop() {

    if (snake_speed != 60) {
      pup_timeout();
    };

    setTimeout(function () {
      paint();
      theLoop();
    }, snake_speed);

  }

  init();

  function create_walls()
  {
    var length = w/cw;
    var top_array=[];
    var bottom_array=[];
    var left_array=[];
    var right_array=[];

    for(var i = length-1; i>=0; i--)
    { /// building each wall invidually for flexible adjustments in the future.
      top_array.push({x:i, y:0});
      bottom_array.push({x:i, y:49});
      left_array.push({x:0, y:i});
      right_array.push({x:49, y:i});
    }

    // We should probably build a function what makes holes in the walls programatically, until then:
    top_array.splice(19,10);
    bottom_array.splice(19,10);
    left_array.splice(19,10);
    right_array.splice(19,10);

    wall_array = top_array.concat(bottom_array, left_array, right_array);
  }

  function create_snake()
  {
    var length = 5;
    snake_array=[];
    for(var i = length-1; i>=0; i--)
    {
      snake_array.push({x:i, y:1});
    }
  }

  function score(){
    var snake_length_text = "ya length:" + snake_length;
    ctx.fillStyle = "white";
    ctx.font = "20px Helvetica";
    ctx.fillText(snake_length_text, 15, h - 17);
  }

  function create_bait(){
    bait = {
      x: Math.floor(Math.random()*(w-cw*2)/cw + 1),
      y: Math.floor(Math.random()*(h-cw*2)/cw + 1),
    }
}
  function create_Pup(string){
    if(pup == null){
    pup = {
      x: Math.floor(Math.random()*(w-cw*2)/cw + 1),
      y: Math.floor(Math.random()*(h-cw*2)/cw + 1),
      kind: string,
    }
    smack();
   }
  }

  function chomp(){
    var snd = new Audio("VUX-Bite.wav"); // buffers automatically when created
    snd.play();
  }

  function paint(){
    //recolor canvas each frame to make previous tail go away
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "lime";
    ctx.strokeRect(0,0,w,h);

    score();
    create_walls();

    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    if (d == "right")nx++;
    else if (d == "left")nx--;
    else if (d == "up")ny--;
    else if (d == "down")ny++;

    // wrap snake across window borders
    if (nx == -1)nx=w/cw;
    else if (nx == w/cw)nx=0;
    else if (ny == -1)ny=h/cw;
    else if (ny == h/cw)ny=0;

    if(check_collisions(nx, ny, snake_array) || check_collisions(nx, ny, wall_array))
    {
      return;
    }

    if(nx == bait.x && ny == bait.y)
    {
      var tail = {x: nx, y: ny};
      snake_length++;
      chomp();
      create_bait();
    }
    else
    {
      var tail = snake_array.pop();
      tail.x = nx; tail.y = ny;
    }

    snake_array.unshift(tail);

    for(var i = 0; i < snake_array.length; i++)
    {
      var c = snake_array[i];
      paint_cell(c.x, c.y);
    }

    paint_cell(bait.x, bait.y, "bait");

    // ///paint the (perimeter) walls
    for (var i = 0; i < wall_array.length; i++)
    {
    paint_cell(wall_array[i].x, wall_array[i].y, "wall");
    }

    //// powerup tests

    if (snake_length % 2 == 0) {
      create_Pup("slowPUP");
    }

    if (snake_length % 2 != 0) {
      create_Pup("speedPUP");
    }

    if (pup != null) {
      paint_cell(pup.x, pup.y, pup.kind);
    }

    if(pup != null && nx == pup.x && ny == pup.y)
    {
      if (pup.kind == "speedPUP") {
        pup_duration = 3000;
        snake_speed = 40;
        console.log("fast!");
        pup = null;
      } else if (pup.kind == "slowPUP"){
        pup_duration = 3000;
        snake_speed = 100;
        console.log("slow!");
        pup = null;
      };

    }

  }

  function smack() {
    var smk = new Audio("smack.wav");
    smk.play();
  }

  function paint_cell(x, y, kind){

    function triangle(color){
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.strokeStyle = "black";
      ctx.moveTo(x*cw + 5,y*cw);
      ctx.lineTo(x*cw + 10, y*cw + 9);
      ctx.lineTo(x*cw, y*cw + 9);
      ctx.fill();
       }

    // bait is circles now, just because.
    function circ(color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x*cw + 5,y*cw + 5,5,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
    }

    function rect(color){
      ctx.fillStyle = color;
      ctx.fillRect(x*cw, y*cw, cw, cw);
      ctx.strokeStyle = "black";
      ctx.strokeRect(x*cw, y*cw, cw, cw);
    }

  {
    if (kind == "bait")
    { circ("orange");
  } else if (kind == "wall") {
    rect("grey");
  } else if (kind == "speedPUP") {
    triangle("salmon");
  } else if (kind == "slowPUP") {
    triangle("aqua");
  } else {
    rect("lime");
  }
}
}

  function check_collisions(x, y, array)
  {
    for(var i = 0; i < array.length; i++)
    {
      if(array[i].x == x && array[i].y == y)
        return true;
    }
    return false;
  }

  $(document).keydown(function(e){
    var key = e.which;
    if(key == "37" && d != "right")d = "left";
    else if(key == "38" && d != "down")d = "up";
    else if(key == "39" && d != "left")d = "right";
    else if(key == "40" && d != "up")d = "down";
  })

})
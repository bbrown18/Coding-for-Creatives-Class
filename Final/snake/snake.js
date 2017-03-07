function Snake() {
    this.x = (floor(random(floor((windowWidth - 20) / 20)))) * 20;
    this.y = (floor(random(floor((windowHeight - 20) / 20)))) * 20;
    this.xDir = 1;
    this.yDir = 0;
    this.speed = 20;
    this.score = 0;
    this.eatAt = 0;
    this.snakeLength = 0;
    this.tail = [];
    // Spell out name here
    //this.name = ['B', 'E', 'V', 'E', 'R', 'L', 'Y'];

    this.color = ['white', 'gold', 'cornflowerblue', 'lightseagreen', 'silver', 'tomato', 'slateblue', 'sandybrown', 'yellowgreen', 'hotpink'];
    this.display = function() {
        var index = floor((this.score % 500) / 50);
        fill(this.color[index]);
        stroke(this.color[index]);
        
        //for the tail
        for (var i = 0; i < this.tail.length; i++) {
            //fill('red');
            //textStyle(NORMAL);
            //textSize(18);
            //noStroke();
            //text(this.name[i], this.tail[i].x, this.tail[i].y);
            image(myImage[i], this.tail[i].x, this.tail[i].y, 35, 35)
        }

        // for the head
        fill('white');
        //textStyle(NORMAL);
        //textSize(18);
        //noStroke();
        text('🎈', this.x, this.y);
        
    };

    this.update = function() {

        for (var i = 0; i <= this.tail.length - 2; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.snakeLength - 1] = createVector(this.x, this.y);

        this.x += this.xDir * this.speed;
        this.y += this.yDir * this.speed;

        //put constraint
        this.x = constrain(this.x, 0, windowWidth - 20);
        this.y = constrain(this.y, 0, windowHeight - 20);
    };
    this.set_dir = function(x, y) {
        this.xDir = x;
        this.yDir = y;
    };
    this.eat = function() {
        for (var i = 0; i < 6; i++) {
            var d = dist(this.x, this.y, foods[i].x, foods[i].y);
            if (d < 15) {
                this.snakeLength++;
                this.score += 10;
                var fr = getFrameRate();
                fr = floor(fr);
                if (this.score % 50 == 0 && this.score != 0 && fr <= 30) {
                    frameRate(fr + 3);
                    console.log(fr);
                }
                foods[i] = null;
                this.eatAt = i;
                return true;
            }
        }
    };
    this.die = function() {
        if (this.tail.length == 0) {
            if (this.x >= windowWidth - 20 || this.y >= windowHeight - 20 || this.x <= 0 || this.y <= 0)
                return true;
        } else if (this.tail.length != 0) {
            for (var i = 0; i < this.tail.length; i++) {
                var pos = this.tail[i];
                var d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 5) {
                    this.score = 0;
                    this.total = 0;
                    this.tail = [];
                    return true;
                }
            }
        } else {
            return false;
        }
    };
    this.win = function() {
        if (this.tail.length == myname.length) {
            return true;
        }
    }
}
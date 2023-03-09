function Box(x, y, w, h, col, tempX) {
    //var col = [];
    this.body = Bodies.rectangle(x, y, w, h);
    this.body.friction = 0.8;
    this.body.restitution = 0.3;
    this.w = w;
    this.h = h;
    this.tempX = tempX;
    this.col = col;
    Composite.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(this.col);
        rect(tempX, 0, this.w, this.h);
        pop();

    }
}

// function Box1(x, y, w, h) {
//     this.body = Bodies.rectangle(x, y, w, h);
//     this.w = w;
//     this.h = h;
//     //Composite.add(world, this.body);

//     this.show = function() {
//         var pos = this.body.position;
//         var angle = this.body.angle;

//         push();
//         translate(pos.x, pos.y);
//         fill(col);
//         rotate(angle);
//         rectMode(CENTER);
//         rect(random(-2, 2), 0, this.w, this.h);
//         pop();

//     }
// }
var bg; // background image
var dropperImg;
var dropper;
var crackSound;
var rose = [];
var rose_bool = false;
var ingre = []; //ingredients
var origs = []; // ingedients break downs to particiles when hovering

var engine;
var world;
var boxes = [];

// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

function preload() {
    soundFormats('mp3', 'ogg');
    crackSound = loadSound('crack.mp3');
    bg = loadImage('A4.png');
    dropperImg = loadImage('dropper.png');
}



function setup() {
    createCanvas(595, 842);
    textFont("Roboto", 14);
    textAlign(LEFT, TOP); //change text alignment to bottom
    //textStyle(BOLD); // change text style
    fill(255, 204, 0);
    dropper = new Dropper();
    ingre.push(new Particles(395, 642, 200, 200));
    ingre.push(new Particles(0, 0, 160, 160));
    ingre.push(new Particles(0, 592, 200, 160));
    ingre.push(new Particles(475, 24, 120, 120));
    ingre.push(new Particles(475, 310, 120, 120));
    //origs.push(new Original(395, 642, 200, 200));
    console.log(ingre[0]);
    
    // Physics Engine
    // create an engine
    engine = Engine.create();
    world = engine.world;

    // create runner
    var runner = Runner.create();
    // run the engine
    Runner.run(runner, engine);

    var options = {
        isStatic: true
    }
    var ground = Bodies.rectangle(202 + 185/2, 546, 185, 40, options);
    var wall1 = Bodies.rectangle(192, 402.5, 20, 247, options);
    var wall2 = Bodies.rectangle(397, 402.5, 20, 247, options);

    // add bottom and two sides to the world
    //Composite.add(world, box1);
    Composite.add(world, ground);
    Composite.add(world, wall1);
    Composite.add(world, wall2);
   
}
function draw() {
    background(40);
    image(bg, 0, 0);

    

    // console.log(bg.get(395 + 20 + 40 * 4, 642 + 20 + 40 * 4) == bg.get(395 + 20 + 40 * 3, 642 + 20 + 40 * 4));
    // console.log(bg.get(395 + 20 + 40 * 3, 642 + 20 + 40 * 4));
    // fill(bg.get(395 + 60, 642 + 60));
    // noStroke();
    // rect(395 + 40 * 0, 642 + 40 * 0, 40, 40);

    // for (let i = 0; i < 5; i++) {
    //     for (let j = 0; j < 5; j++) {
    //         let col = bg.get(395 + 20 + 40 * i, 642 + 20 + 40 * j);
    //         //console.log(col);
    //         if (JSON.stringify(col) === JSON.stringify(bg.get(395 + 20 + 40 * 4, 642 + 20 + 40 * 4))) {
    //             // console.log('hola');
    //             continue;
    //         }
    //         if (!rose_bool) {
    //             //(rose, col);
    //             rose.push(col);
    //         }
            
    //         fill(col);
    //         // strokeWeight(0.5);
    //         stroke(250);
    //         rect(395 + 40 * i, 642 + 40 * j, 40, 40);
    //     }
    // }
    // rose_bool = true;

    // console.log(ceil(random(0.1, rose.length)) - 1);

    // ingre[0].breakDown();
    // for (let i = 0; i < ingre.length; i++) {
    //     if (mouseX > ingre[i].x && mouseX < width && (mouseY + 68) > ingre[i].y && mouseY < height) {
    //         console.log('holalala');
    //         ingre[i].breakDown();
    //         break;
    //     }
    // }
    mouseHover();
    dropper.show();
    ingre[0].show();
    ingre[1].show();
    ingre[2].show();
    ingre[3].show();
    ingre[4].show();
    
    
}

function mouseHover() {
    for (let i = 0; i < ingre.length; i++) {
        if (mouseX > ingre[i].x && mouseX < ingre[i].x + ingre[i].w && (mouseY + 68) > ingre[i].y && mouseY < ingre[i].y + ingre[i].h) {
            console.log('holalala');
            ingre[i].breakDown();
            break;
        }
    }
}

function mouseClicked() {
    console.log('hola');
    for (let i = 0; i < ingre.length; i++) {
        if (mouseX > ingre[i].x && mouseX < ingre[i].x + ingre[i].w && (mouseY + 68) > ingre[i].y && mouseY < ingre[i].y + ingre[i].h) {
            console.log('hola');
            ingre[i].suck();
            break;
        }

        // if (mouseX > 276 && (mouseY + 68) > 279 && ingre[i].inDropper) {
        //     ingre[i].drop();
        // }
    }
}

class Dropper {
    constructor() {
        // this.x = mouseX;
        // this.y = mouseY;        
    }

    show() {
        this.x = mouseX - 55;
        this.y = mouseY - 382;
        image(dropperImg, this.x, this.y);
    }

    // update() {
    //     this.
    // }
}

class Particles {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cols = []; // the 6 random colors
        this.sucking = false;
        this.bool = false; // determine if the particle color palette has been saved or not
        this.colorPalette = []; // all particle colors
    }

    suck() {
        console.log('holala');
        this.sucking = true;
        for (let i = 0; i < 6; i++){
            let rand = ceil(random(0.1, this.colorPalette.length)) - 1;
            let col = this.colorPalette[rand];
            this.cols.push(col);
            this.colorPalette.splice(rand, 1);
        }
        
    }

    show() {
        if(this.sucking) {
            for (let i = 0; i < 6; i++){                
                fill(this.cols[i]);            
                rect(mouseX - 18, mouseY - 40 * (i + 1), 40, 40);
                // pop();
            }
        }
    }

    breakDown() {
        console.log(this.w);
        for (let i = 0; i < Math.round(this.w/20); i++) {
            for (let j = 0; j < Math.round(this.h/20); j++) {
                let col = bg.get(this.x + 10 + 20 * i, this.y + 10 + 20 * j);
                
                //console.log(col);
                if (JSON.stringify(col) === JSON.stringify(bg.get(395 + 20 + 40 * 4, 642 + 20 + 40 * 4))) {
                    // console.log('hola');
                    continue;
                }
                if (!this.bool) {
                    //(rose, col);
                    this.colorPalette.push(col);
                }
                
                fill(col);
                // strokeWeight(0.5);
                stroke(250);
                rect(this.x + 20 * i, this.y + 20 * j, 20, 20);
            }
        }
        this.bool = true;
    }
}

// class Original {
//     constructor(x, y, w, h) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.bool = false; // determine if the particle color palette has been saved or not
//         this.colorPalette = [];
//     }

//     breakDown() {
//         for (let i = 0; i < Math.round(this.w/40); i++) {
//             for (let j = 0; j < Math.round(this.h/40); j++) {
//                 let col = bg.get(this.x + 20 + 40 * i, this.y + 20 + 40 * j);
//                 //console.log(col);
//                 if (JSON.stringify(col) === JSON.stringify(bg.get(395 + 20 + 40 * 4, 642 + 20 + 40 * 4))) {
//                     // console.log('hola');
//                     continue;
//                 }
//                 if (!this.bool) {
//                     //(rose, col);
//                     this.colorPalette.push(col);
//                 }
                
//                 fill(col);
//                 // strokeWeight(0.5);
//                 stroke(250);
//                 rect(this.x + 40 * i, this.y + 40 * j, 40, 40);
//             }
//         }
//         this.bool = true;
//     }
// }

// function mousePressed() {
    
// }

// function mouseReleased() {
    
// }



// class Drag {
    // constructor(sent, aboverows) {
    //     this.dragging = false; // Is the object being dragged?
    //     this.rollover = false; // Is the mouse over the ellipse?

    //     this.sen = sent;
    //     this.aboverows = aboverows;
    //     //this.row = 1;
    //     this.x = 100;
    //     this.y = 60 + 30 * this.aboverows;
    //     //   if (part == 1) {

    //     //   } else {
    //     //     this.y = 100 + 20 * shape2.row;
    //     //   }

    //     // Dimensions
    //     this.w = textWidth(this.sen);
    //     this.h = 30;
    //     this.hoverColor = color(100);
    //     this.nonHoverColor = color(175, 200);
    // }

    // over() {
    //     // Is mouse over object
    //     if (
    //         mouseX > this.x &&
    //         mouseX < this.x + this.w &&
    //         mouseY > this.y &&
    //         mouseY < this.y + this.h
    //     ) {
    //         this.rollover = true;
    //     } else {
    //         this.rollover = false;
    //     }
    // }

    // update() {
    //     // Adjust location if being dragged
    //     if (this.dragging) {
    //         this.x = mouseX + this.offsetX;
    //         this.y = mouseY + this.offsetY;
    //     }
    // }

    // show() {
    //     stroke(0);
    //     translate(0, 0);
    //     // Different fill based on state
    //     if (this.dragging) {
    //         fill(color('#cbcb41'));
    //     } else if (this.rollover) {
    //         fill(this.hoverColor);
    //     } else {
    //         fill(this.nonHoverColor);
    //     }
    //     text(this.sen, this.x, this.y);
    // }

    // pressed() {
    //     // Did I click on the rectangle?
    //     if (
    //         mouseX > this.x &&
    //         mouseX < this.x + this.w &&
    //         mouseY > this.y &&
    //         mouseY < this.y + this.h
    //     ) {
    //         this.dragging = true;
    //         // If so, keep track of relative location of click to corner of rectangle
    //         this.offsetX = this.x - mouseX;
    //         this.offsetY = this.y - mouseY;
    //     }
    // }

    // released() {
    //     // Quit dragging
    //     this.dragging = false;
    //     this.x = 100;
    //     this.y = 60 + 30 * this.aboverows;
    //     this.hoverColor = color(100);
    //     this.nonHoverColor = color(175, 200);
    // }
// }


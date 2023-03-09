var bg; // background image
var bg2;
var dropperImg;
var dropper;
var perfumeLid;
var bgm;
var rose = [];
var rose_bool = false;
var ingre = []; //ingredients
var origs = []; // ingedients break downs to particiles when hovering
var dropCounts = 0;
var names = ['Rose', 'Fig', 'Orange', 'Vanilla', 'Cedar'];
var nameCount = 0;
var bgmPlay = false;
var sounds = [];
var sound0, sound1, sound2, sound3, sound4;

var engine;
var world;
var boxes = [];
var timeNow = 0;

// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

function preload() {
    soundFormats('mp3', 'ogg');
    bgm = loadSound('bgm.mp3'); 
    sound0 = loadSound('0.mp3');  
    sound1 = loadSound('1.mp3');  
    sound2 = loadSound('2.mp3');  
    sound3 = loadSound('3.mp3');  
    sound4 = loadSound('4.mp3');  
    bg = loadImage('A4.png');
    bg2 = loadImage('A4_2.png');    
    dropperImg = loadImage('dropper.png');
    perfumeLid = loadImage('Perfume_lid1.png');
}



function setup() {
    createCanvas(595, 842);
    textFont("Roboto", 14);
    textAlign(LEFT, TOP); //change text alignment to bottom
    //textStyle(BOLD); // change text style
    fill(255, 204, 0);
    dropper = new Dropper();
    ingre.push(new Particles(395, 642, 200, 200, sound0));
    ingre.push(new Particles(0, 0, 160, 160, sound1));
    ingre.push(new Particles(0, 592, 200, 160, sound2));
    ingre.push(new Particles(475, 24, 120, 120, sound3));
    ingre.push(new Particles(475, 310, 120, 120, sound4));
    // sounds.push(sound0);
    // sounds.push(sound0);
    // sounds.push(sound0);
    // sounds.push(sound0);
    // sounds.push(sound0);

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
    var ground = Bodies.rectangle(202 + 185/2, 546, 185, 46, options);
    var wall1 = Bodies.rectangle(192, 402.5, 30, 247, options);
    var wall2 = Bodies.rectangle(397, 402.5, 30, 247, options);

    // add bottom and two sides to the world
    //Composite.add(world, box1);
    Composite.add(world, ground);
    Composite.add(world, wall1);
    Composite.add(world, wall2);

    // for (var i = 0; i < 6; i++) {
    //     boxes.push(new Box(200 + random(-5, 5), 300 + 20 * i, 20, 20, [0,0,0,255], 0)); 
    // }
    boxes.push(new Box(300, 520, 4, 4, [0,0,0,255], 0));
}
function draw() {
    background(40);
    if (dropCounts == -1) {
        image(bg2, 0, 0);
    } else {
        image(bg, 0, 0);
    }

    textFont("Inter", 14);
    textAlign(CENTER, TOP);

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
    ingre[0].drop();
    ingre[1].drop();
    ingre[2].drop();
    ingre[3].drop();
    ingre[4].drop();
    
    if (dropCounts >= 3) {
        timeNow = millis();
        dropCounts = 0;
    }
    if (timeNow != 0 && (millis() - timeNow) >= 2000) {
        image(perfumeLid, 206.97, 238);
        // image(perfumeLid, 202, 238);

        for (let i = 0; i < ingre.length; i++) {
            if (ingre[i].falling) {
                push();
                noStroke();
                fill(90, 90, 90, 255);
                text(names[i], 294, 397 + 17 * nameCount);
                pop(); 
                nameCount++;
            }
            console.log(nameCount);
            if (nameCount >= 3) {
                nameCount = 0;
                break;
            }
        }
        if (!bgmPlay) {
            bgm.play();
            bgmPlay = true;
        }
        
        dropCounts = -1;
    }

    // for (var i = 0; i < boxes.length; i++) {
    //     boxes[i].show();
    // }
    
    
}

function mouseHover() {
    for (let i = 0; i < ingre.length; i++) {
        if (mouseX > ingre[i].x && mouseX < ingre[i].x + ingre[i].w && (mouseY + 68) > ingre[i].y && mouseY < ingre[i].y + ingre[i].h) {
            // console.log('holalala');
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

        if (ingre[i].sucking && mouseX > 275 && mouseX < 275 + 40 && (mouseY + 68) > 279 && mouseY < 279 + 247) {
            console.log('click to drop');
            ingre[i].convertToRigid();
            dropCounts++;
            //ingre[i].sucking = false;
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
    constructor(x, y, w, h, sound) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sound = sound;
        this.cols = []; // the 6 random colors
        this.sucking = false;
        this.falling = false;
        this.bool = false; // determine if the particle color palette has been saved or not
        this.colorPalette = []; // all particle colors
        this.gravityParticles = [];
    }

    suck() {
        // console.log('holala');
        this.sucking = true;
        this.sound.play();
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
                rect(mouseX - 15, mouseY - 34 * (i + 1), 34, 34);
                // pop();
            }
        }
    }

    breakDown() {
        // console.log(this.w);
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
                stroke(180);
                rect(this.x + 20 * i, this.y + 20 * j, 20, 20);
            }
        }
        this.bool = true;
    }

    convertToRigid() {
        for (let i = 0; i < 6; i++) {
            // console.log(this.cols[i]);
            this.gravityParticles.push(new Box(mouseX + 2, mouseY - 34 * (i + 1) + 17, 34, 34, this.cols[i], random(-3, 3)));
            // this.gravityParticles.push(new Box(mouseX + 2, mouseY - 40 * (i + 1) + 20, 40, 40, this.cols[i]));
        }
        this.sucking = false;
        this.falling = true;
    }

    drop() {
        if(this.falling) {
            for (let i = 0; i < 6; i++){                
                this.gravityParticles[i].show();
            }
        }
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


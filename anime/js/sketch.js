var noiseScale = 800;
var canvas;
var particles = [];
/*
 * ウィンドウの大きさが変更されたときに背景が再度描画されるように
 * 元々setup()にあった処理をここに移動した
 */

// function setup() {
//     createCanvas(windowWidth, document.documentElement.scrollHeight);
//     // createCanvas(900, 800);
//     pixelDensity(1);
//     colorMode(HSB, 255);
//     //blendMode(ADD);
// }

function windowResized() {
    resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
    //windowHeightだとスクロールされた時にp５が表示されないので、document.documentElement.scroll。。に書き換える
    // canvasSetup();
}

function setup() {
    canvas = createCanvas(windowWidth, document.documentElement.scrollHeight);
    //ブラウザのウィンドウサイズに合わせてcanvas作成
    canvas.style('z-index', '-1');//canvasを後ろに移動する。
    canvas.position(0, 0);//座標を固定することで表示
    pixelDensity(1);
    colorMode(HSB, 255);
    // canvasSetup();
}

function draw() {
    clear();
    // background("#f0e68c"); カーキ
    background("#fef4f4"); //桜ピンク
    var newParticles = [];
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].wallBound();
        particles[i].display();
        if (particles[i].radius > 0) {
            newParticles.push(particles[i]);
        }
    }
    particles = newParticles;
}


function mouseMoved() {
    var x = mouseX;
    var y = mouseY;
    var vx = (winMouseX - pwinMouseX) * 0.2;
    var vy = (winMouseY - pwinMouseY) * 0.2;
    if ((x > 50 && x < width - 50) && (y > 50 && y < height - 50)) {
        particles.push(new Particle(x, y, vx, vy));
    }
}

function touchMoved() {
    var x = mouseX;
    var y = mouseY;
    var vx = (winMouseX - pwinMouseX) * 0.2;
    var vy = (winMouseY - pwinMouseY) * 0.2;
    if ((x > 50 && x < width - 50) && (y > 50 && y < height - 50)) {
        particles.push(new Particle(x, y, vx, vy));
    }
}

var Particle = function (x, y, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.friction = 0.005;
    this.h = 100 * abs(cos((frameCount / 600) * PI));
    this.fcolor = color(this.h, 137, 255, 185);
    this.ecolor = color(10000, 0, 0, 0);
    this.radius = random(5, 50);
    this.shape = floor(random(3, 33));
}

Particle.prototype.update = function () {
    this.velocity = this.velocity.mult(1 - this.friction);
    this.position = this.position.add(this.velocity);
    this.radius -= 0.1;
}

Particle.prototype.wallThrough = function () {
    if (this.position.x >= width) {
        this.position.x = 0;
    }
    if (this.position.x <= 0) {
        this.position.x = width;
    }
    if (this.position.y >= height) {
        this.position.y = 0;
    }
    if (this.position.y <= 0) {
        this.position.y = height;
    }
}

Particle.prototype.wallBound = function () {
    if ((this.position.x >= width - this.radius) || (this.position.x <= this.radius)) {
        this.velocity.x = -this.velocity.x;
    }
    else if ((this.position.y >= height - this.radius) || (this.position.y <= this.radius)) {
        this.velocity.y = -this.velocity.y;
    }
    else {
        return;
    }
}

Particle.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    //noStroke();
    noStroke(this.ecolor);
    strokeWeight(1);
    fill(this.fcolor);
    ellipse(0, 0, 2 * this.radius, 2 * this.radius, floor(this.shape));
    //if (this.shape == 0) {
    //  ellipse(0, 0, 2*this.radius, 2*this.radius, 32);
    //} else {
    //  rect(0, 0, 2*this.radius, 2*this.radius);
    //}
    //sphere(this.radius);
    pop();
}
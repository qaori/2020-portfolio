var tileCount = 20;
var actRandomSeed = 0;

var circleAlpha = 235;
var circleColor;

function windowResized() {
    resizeCanvas(document.documentElement.scrollWidth, h);
}

function setup() {
    if (navigator.userAgent.match(/(Android)/i)) {
        h = 1200;
    } else if (navigator.userAgent.match(/(iPhone)/i)) {
        h = 1200;
    } else if (navigator.userAgent.match(/(iPad|iPodPro)/i)) {
        h = 1350;
    } else {
        h = 800;
    }
    canvas = createCanvas(document.documentElement.scrollWidth, h);
    canvas.position(0, 0);//canvasをページの原点に固定
    canvas.style('z-index', '-1');
    noFill();
    circleColor = color(255, 99, 100, circleAlpha);
    // 	tomato(rgb255, 99, 100)
}

function draw() {
    translate(width / tileCount / 2, height / tileCount / 2);

    background(255, 228, 225);

    randomSeed(actRandomSeed);

    stroke(circleColor);
    strokeWeight(mouseX / 30);
    // 	円の形と表示がポインター位置で変わる。数が大きくなると円が細く小さくなる。

    for (var gridY = 0; gridY < tileCount; gridY++) {
        for (var gridX = 0; gridX < tileCount; gridX++) {

            var posX = width / tileCount * gridX;
            var posY = height / tileCount * gridY;

            var shiftX = random(-mouseX, mouseX) / 20;
            var shiftY = random(-mouseX, mouseX) / 20;

            ellipse(posX + shiftX, posY + shiftY, mouseY / 12, mouseY / 12);
        }
    }
}

function mousePressed() {
    actRandomSeed = random(10000);
}

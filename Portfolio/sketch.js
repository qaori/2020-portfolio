function setup() {
    createCanvas(400, 400, WEBGL)
}


// function draw() {
//     background(255),//背景がないと動きがない絵になる
//         noStroke(),
//         rotateX(PI / 3);//X,Y,Zを入れるとanimationの向きが変わる.
//     // rotateは回転させるという意味(Zを入れた時とrotateのみは同じ動き)
//     for (var n = 0; n < 10; n++)push(),
//         fill(0, 60 * sin(frameCount / 30 + n / 2) * n, 255 * sin(frameCount / 30 + n / 2)),
//         translate(0, 0, sin(frameCount / 30 + n / 2) * (100 / n)), torus(16 * n, 3, 60, 60), pop()
// }

function draw() {
    background(0),
        noStroke(),
        rotateX(PI / 1);
    for (var n = 0; n < 10; n++)push(),
        fill(0, 30 * sin(frameCount / 50 + n / 2) * n, 150 * sin(frameCount / 30 + n / 2)),
        translate(0, 0, sin(frameCount / 30 + n / 2) * (100 / n)), torus(16 * n, 3, 70, 80), pop()
}

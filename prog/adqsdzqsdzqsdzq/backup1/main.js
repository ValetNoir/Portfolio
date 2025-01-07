// baseline is up left

let canvas = document.querySelector("canvas");
let W = canvas.width = 135;
let H = canvas.height = 192;
let frameLength = W * H;
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let colors = [
  0,0,0, // black : 0
  127,127,127, // dark gray : 1
  136,0,21, // dark red : 2
  237,28,36, // red : 3
  255,127,39, // orange : 4
  255,242,0, // yellow : 5
  34,177,76, // green : 6
  0,162,232, // aqua : 7
  63,72,204, // blue : 8
  163,73,164, // purple : 9
  255,255,255, // white : 10
  195,195,195, // gray : 11
  185,122,87, // brown : 12
  255,174,201, // pink : 13
  255,201,14, // gold : 14
  239,228,176, // beige : 15
  181,230,29, // light green : 16
  153,217,234, // light blue : 17
  112,146,190, // dull blue : 18
  200,191,231, // lavender : 19
];

let littleNumbers = [
  [0, 1, 0,
  1, 0, 1,
  1, 0, 1,
  1, 0, 1,
  0, 1, 0], // 0
  [0, 1, 0,
  1, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0], // 1
  [1, 1, 0,
  0, 0, 1,
  0, 1, 0,
  1, 0, 0,
  1, 1, 1], // 2
  [1, 1, 0,
  0, 0, 1,
  0, 1, 0,
  0, 0, 1,
  1, 1, 0], // 3
  [1, 0, 1,
  1, 0, 1,
  1, 1, 1,
  0, 0, 1,
  0, 0, 1], // 4
  [1, 1, 1,
  1, 0, 0,
  1, 1, 0,
  0, 0, 1,
  1, 1, 0], // 5
  [0, 1, 0,
  1, 0, 0,
  1, 1, 0,
  1, 0, 1,
  0, 1, 0], // 6
  [1, 1, 1,
  0, 0, 1,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0], // 7
  [0, 1, 0,
  1, 0, 1,
  0, 1, 0,
  1, 0, 1,
  0, 1, 0], // 8
  [0, 1, 0,
  1, 0, 1,
  0, 1, 1,
  0, 0, 1,
  0, 1, 0], // 9
];

let bigNumbers = [
  [1, 1, 1,
  1, 0, 1,
  1, 0, 1,
  1, 0, 1,
  1, 1, 1], // 0
  [0, 1, 0,
  1, 1, 0,
  0, 1, 0,
  0, 1, 0,
  1, 1, 1], // 1
  [1, 1, 1,
  0, 0, 1,
  1, 1, 1,
  1, 0, 0,
  1, 1, 1], // 2
  [0, 0, 1,
  1, 1, 1,
  0, 0, 1,
  1, 1, 1,
  1, 0, 1], // 3
  [1, 0, 1,
  1, 1, 1,
  0, 0, 1,
  0, 0, 1,
  1, 1, 1], // 4
  [1, 1, 1,
  1, 0, 0,
  1, 1, 1,
  0, 0, 1,
  1, 1, 1], // 5
  [1, 1, 1,
  1, 0, 0,
  1, 1, 1,
  1, 0, 1,
  1, 1, 1], // 6
  [1, 1, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1], // 7
  [1, 1, 1,
  1, 0, 1,
  1, 1, 1,
  1, 0, 1,
  1, 1, 1], // 8
  [1, 1, 1,
  1, 0, 1,
  1, 1, 1,
  0, 0, 1,
  1, 1, 1], // 9
];

let frame = new Uint8ClampedArray(frameLength * 4);

function setPixelXY(x, y, color, alpha) {
  let i = (x + y * W) * 4;
  let j = color * 3;
  frame[i]     = colors[j];
  frame[i + 1] = colors[j + 1];
  frame[i + 2] = colors[j + 2];
  frame[i + 3] = 255;
}

function setPixel(i, color, alpha) {
  i *= 4;
  let j = color * 3;
  frame[i]     = colors[j];
  frame[i + 1] = colors[j + 1];
  frame[i + 2] = colors[j + 2];
  frame[i + 3] = 255;
}

function hLine(x, y, w, color) {
  for(let i = 0; i < w; i++) {
    setPixelXY(x + i, y, color);
  }
}

function vLine(x, y, h, color) {
  for(let i = 0; i < h; i++) {
    setPixelXY(x, y + i, color);
  }
}

function fillRect(x, y, w, h, color) {
  for(let i = 0; i < w; i++) {
    for(let j = 0; j < h; j++) {
      setPixelXY(x + i, y + j, color);
    }
  }
}

function lineRect(x, y, w, h, color) {
  let maxX = x + w - 1;
  let maxY = y + h - 1;
  for(let i = 1; i < w - 1; i++) {
    setPixelXY(x + i, y,    color);
    setPixelXY(x + i, maxY, color);
  }
  for(let i = 0; i < h; i++) {
    setPixelXY(x,    y + i, color);
    setPixelXY(maxX, y + i, color);
  }
}

function lineNumber(x, y, n, isBig) {
  let string = "" + Math.floor(n);
  for(let i = 0; i < string.length; i++) {
    let digitIndex = +string[i];
    drawImage(x + i * 4, y, (isBig)? bigNumbers[digitIndex] : littleNumbers[digitIndex], 3, 5);
  }
}

function drawImage(X, Y, imageArray, w, h) {
  console.log(imageArray)
  h = h && Math.floor(imageArray.length / w);
  for(let x = 0; x < w; x++) {
    for(let y = 0; y < h; y++) {
      let color = imageArray[x + y * w] - 1;
      if(color > -1) setPixelXY(X + x, Y + y, color);
    }
  }
}

function doCoolStuff(formula) {
  for(let x = 0; x < W; x++) {
    for(let y = 0; y < H; y++) {
      setPixelXY(x, y, Math.floor(formula(x, y) % 20), 255);
    }
  }
}

function draw(dt) {
  lineRect(0, 0, W, H, 11);
  lineRect(1, 1, W - 2, H - 2, 1);
  fillRect(2, 2, W - 4, 14, 8);
  hLine(2, 15, W - 4, 1)
  lineNumber(10, 10, 326516, false);
  ctx.putImageData(new ImageData(frame, W, H), 0, 0);
  // requestAnimationFrame(draw);
}

draw();
// requestAnimationFrame(draw);
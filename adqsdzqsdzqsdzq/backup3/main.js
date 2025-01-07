// baseline is up left

let colors = [
  0,0,0,       // black : 0
  127,127,127, // dark gray : 1
  136,0,21,    // dark red : 2
  237,28,36,   // red : 3
  255,127,39,  // orange : 4
  255,242,0,   // yellow : 5
  34,177,76,   // green : 6
  0,162,232,   // aqua : 7
  63,72,204,   // blue : 8
  163,73,164,  // purple : 9
  255,255,255, // white : 10
  195,195,195, // gray : 11
  185,122,87,  // brown : 12
  255,174,201, // pink : 13
  255,201,14,  // gold : 14
  239,228,176, // beige : 15
  181,230,29,  // light green : 16
  153,217,234, // light blue : 17
  112,146,190, // dull blue : 18
  200,191,231, // lavender : 19
];

let transparencies = [
  0, 100, 200, 255
];

let newColors = [];

let littleNumbers = [
  [-1, 0, -1,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  -1, 0, -1], // 0
  [-1, 0, -1,
  0, 0, -1,
  -1, 0, -1,
  -1, 0, -1,
  -1, 0, -1], // 1
  [0, 0, -1,
  -1, -1, 0,
  -1, 0, -1,
  0, -1, -1,
  0, 0, 0], // 2
  [0, 0, -1,
  -1, -1, 0,
  -1, 0, -1,
  -1, -1, 0,
  0, 0, -1], // 3
  [0, -1, 0,
  0, -1, 0,
  0, 0, 0,
  -1, -1, 0,
  -1, -1, 0], // 4
  [0, 0, 0,
  0, -1, -1,
  0, 0, -1,
  -1, -1, 0,
  0, 0, -1], // 5
  [-1, 0, -1,
  0, -1, -1,
  0, 0, -1,
  0, -1, 0,
  -1, 0, -1], // 6
  [0, 0, 0,
  -1, -1, 0,
  -1, 0, -1,
  -1, 0, -1,
  -1, 0, -1], // 7
  [-1, 0, -1,
  0, -1, 0,
  -1, 0, -1,
  0, -1, 0,
  -1, 0, -1], // 8
  [-1, 0, -1,
  0, -1, 0,
  -1, 0, 0,
  -1, -1, 0,
  -1, 0, -1], // 9
];

let bigNumbers = [
  [0, 0, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, 0, 0], // 0
  [-1, 0, -1,
  0, 0, -1,
  -1, 0, -1,
  -1, 0, -1,
  0, 0, 0], // 1
  [0, 0, 0,
  -1, -1, 0,
  0, 0, 0,
  0, -1, -1,
  0, 0, 0], // 2
  [0, 0, 0,
  -1, -1, 0,
  0, 0, 0,
  -1, -1, 0,
  0, 0, 0], // 3
  [0, -1, 0,
  0, -1, 0,
  0, 0, 0,
  -1, -1, 0,
  -1, -1, 0], // 4
  [0, 0, 0,
  0, -1, -1,
  0, 0, 0,
  -1, -1, 0,
  0, 0, 0], // 5
  [0, 0, 0,
  0, -1, -1,
  0, 0, 0,
  0, -1, 0,
  0, 0, 0], // 6
  [0, 0, 0,
  -1, -1, 0,
  -1, -1, 0,
  -1, -1, 0,
  -1, -1, 0], // 7
  [0, 0, 0,
  0, -1, 0,
  0, 0, 0,
  0, -1, 0,
  0, 0, 0], // 8
  [0, 0, 0,
  0, -1, 0,
  0, 0, 0,
  -1, -1, 0,
  0, 0, 0], // 9
];

let toolIcons = {
  "pencil" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 13, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 13, 13, 13, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1, 13, 13, 13, 13,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,  1, 11,  1, 13, 13, -1,
    -1, -1, -1, -1, -1, -1, -1, -1,  1,  5,  1, 11,  1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,  1,  5, 14, 14,  1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  1,  5, 14, 14,  1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  1,  5, 14, 14,  1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,  1,  5, 14, 14,  1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1,  1,  5, 14, 14,  1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,  1,  5, 14, 14,  1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  1,  5, 14, 14,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    15, 15,  1, 14,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     0, 15, 15,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     0,  0, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "pixelPerfectPencil" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 13, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 13, 13, 13, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1, 13, 13, 13, 13,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,  1, 11,  1, 13, 13, -1,
    -1, -1, -1, -1, -1, -1, -1, -1,  1,  7,  1, 11,  1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,  1,  7,  8,  8,  1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  1,  7,  8,  8,  1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  1,  7,  8,  8,  1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,  1,  7,  8,  8,  1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1,  1,  7,  8,  8,  1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,  1,  7,  8,  8,  1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  1,  7,  8,  8,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    15, 15,  1,  8,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     0, 15, 15,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     0,  0, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "bucket" : [
    -1,  3,  3,  3,  3,  3,  1,  1,  1,  1,  1,  1,  1, -1, -1,
     3,  3,  3,  3, 11, 11, 11, 10, 10, 11, 11,  1,  0,  0, -1,
     3,  3,  3,  1, 11, 11, 11, 10, 10, 11, 11,  1,  1, -1,  0,
     3,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1,  0,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, -1, -1,
  ],
  "bucketPlus" : [
    -1,  8,  8,  8,  8,  8,  1,  1,  1,  1,  1,  1,  1, -1, -1,
     8,  8,  8,  8, 11, 11, 11, 10, 10, 11, 11,  1,  0,  0, -1,
     8,  8,  8,  1, 11, 11, 11, 10, 10, 11, 11,  1,  1, -1,  0,
     8,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1,  0,  0,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1, 11, 11, 11, 10, 10, 11, 11, 11,  1, -1, -1,
    -1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, -1, -1,
  ],
  "rubber" : [
    -1, -1, -1, -1, -1, -1, -1,  8,  8, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  8,  7,  7,  8,  8, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  8,  7,  7,  7,  7,  7,  8,  8, -1, -1,
    -1, -1, -1, -1,  3, 13,  7,  7,  7,  7,  7,  7,  7,  8,  8,
    -1, -1, -1,  3, 13, 13, 13, 13,  7,  7,  7,  7,  7,  8,  8,
    -1, -1,  3, 13, 13, 13, 13, 13, 13, 13,  7,  7,  8,  7,  8,
    -1,  3, 13, 13, 13, 13, 13, 13, 13, 13, 13,  3,  7,  7,  8,
     3,  3, 13, 13, 13, 13, 13, 13, 13, 13,  3, 13,  7,  7,  8,
     3, 13,  3,  3, 13, 13, 13, 13, 13,  3, 13, 13,  7,  8, -1,
     3, 13, 13, 13,  3,  3, 13, 13,  3, 13, 13, 13,  8, -1, -1,
     3, 13, 13, 13, 13, 13,  3,  3, 13, 13, 13,  3, -1, -1, -1,
     3,  3, 13, 13, 13, 13, 13,  3, 13, 13,  3, -1, -1, -1, -1,
    -1, -1,  3,  3, 13, 13, 13,  3, 13,  3, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,  3,  3, 13,  3,  3, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  3,  3, -1, -1, -1, -1, -1, -1, -1,
  ],
  "eyedropper" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  7,  7,  7,  8,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  7,  7,  7,  7,  8,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,  7,  7,  7,  7,  8,  8,
    -1, -1, -1, -1, -1, -1, -1,  8,  7,  7,  7,  7,  8,  8,  8,
    -1, -1, -1, -1, -1, -1, -1, -1,  8,  7,  7,  8,  8,  8, -1,
    -1, -1, -1, -1, -1, -1, -1,  1, 10,  8,  8,  8,  8, -1, -1,
    -1, -1, -1, -1, -1, -1,  1, 10, 10, 11,  8,  8, -1, -1, -1,
    -1, -1, -1, -1, -1,  1, 10, 10, 11,  1, -1,  8, -1, -1, -1,
    -1, -1, -1, -1,  1, 10, 10, 11,  1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1,  1, 10, 10, 11,  1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,  1, 10, 10, 11,  1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1,  1, 10, 11,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  1, 10,  1,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     1, 10,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     1,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "brush0" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "brush1" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "brush2" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "brush3" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1,
    -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1,
    -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "brush4" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1,
    -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1,
    -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,
    -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,
    -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,
    -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1,
    -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  "brush5" : [
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
    -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1,
    -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1,
    -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1,
    -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
  ],
  "selectRect" : [
    8,  8, -1,  8, -1,  8, -1,  8, -1,  8, -1,  8, -1,  8,  8,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
    8,  8, -1,  8, -1,  8, -1,  8, -1,  8, -1,  8, -1,  8,  8,
  ],
  "line" : [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  8, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1,  8,  8, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,  8, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,  8,  8, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,  8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1,  8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  8,  8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
};

let windowIcons = {
  "title" : [
     8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10, 10, 10, 10,  8,  8, 10, 10,  8,  8, 10, 10, 10,  8,  8,  8, 10, 10,  8,
     8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,
     8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10, 10, 10, 10,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 10, 10, 10, 10, 10,  8, 10,  8,  8,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,
    10,  8,  8,  8, 10,  8, 10, 10, 10,  8,  8,  8, 10,  8,  8,  8, 10, 10, 10,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10, 10, 10, 10,  8,  8,  8, 10, 10, 10,  8,  8, 10, 10,  8,  8, 10,  8, 10, 10,  8,  8,  8, 10,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,
    10,  8,  8,  8, 10,  8,  8,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8,  8, 10,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8, 10,  8, 10,  8,  8,  8, 10,  8,  8, 10,  8,  8, 10, 10,  8,  8, 10,  8,  8, 10,  8, 10,  8,  8, 10, 10, 10,  8,  8, 10, 10, 10,  8,  8,  8, 10, 10,  8,  8,  8, 10, 10,  8,
    10,  8,  8,  8, 10,  8,  8, 10, 10, 10,  8,  8, 10,  8,  8, 10, 10, 10, 10,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8, 10,  8, 10,  8,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,
     8, 10,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8, 10,  8, 10,  8,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8,  8, 10, 10, 10, 10, 10,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,
     8, 10,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8,  8, 10,  8,  8,  8,  8,  8,  8,  8,  8, 10,  8,  8,  8, 10,  8, 10,  8,  8,  8, 10,  8,  8, 10,  8,  8, 10,  8,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10,
     8,  8, 10,  8,  8,  8, 10, 10, 10, 10,  8, 10, 10, 10,  8,  8, 10, 10, 10, 10,  8,  8, 10, 10, 10,  8,  8,  8,  8,  8, 10,  8,  8,  8, 10,  8,  8, 10, 10, 10,  8,  8, 10, 10, 10,  8, 10,  8,  8,  8,  8,  8,  8, 10,  8, 10,  8,  8, 10, 10, 10,  8,  8,  8, 10, 10,  8,  8, 10, 10, 10,  8,  8,  8, 10, 10,  8,
  ],
  "button" : [
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    10, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1,
    11,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
  ],
  "?" : [
    -1, -1,  0,  0,  0, -1, -1,
    -1,  0, -1, -1, -1,  0, -1,
    -1, -1, -1, -1, -1,  0, -1,
    -1, -1, -1,  0,  0, -1, -1,
    -1, -1, -1,  0, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1,  0, -1, -1, -1,
  ],
  "_" : [
    -1, -1, -1,  0, -1, -1, -1,
    -1, -1, -1,  0, -1, -1, -1,
    -1, -1, -1,  0, -1, -1, -1,
    -1,  0, -1,  0, -1,  0, -1,
    -1, -1,  0,  0,  0, -1, -1,
    -1, -1, -1,  0, -1, -1, -1,
    -1,  0,  0,  0,  0,  0, -1,
  ],
  "◻" : [
     0,  0,  0,  0,  0,  0,  0,
     0, -1, -1, -1, -1, -1,  0,
     0, -1, -1, -1, -1, -1,  0,
     0, -1, -1, -1, -1, -1,  0,
     0, -1, -1, -1, -1, -1,  0,
     0, -1, -1, -1, -1, -1,  0,
     0,  0,  0,  0,  0,  0,  0,
  ],
  "X" : [
     0, -1, -1, -1, -1, -1,  0,
    -1,  0, -1, -1, -1,  0, -1,
    -1, -1,  0, -1,  0, -1, -1,
    -1, -1, -1,  0, -1, -1, -1,
    -1, -1,  0, -1,  0, -1, -1,
    -1,  0, -1, -1, -1,  0, -1,
     0, -1, -1, -1, -1, -1,  0,
  ],
  "seeMore" : [
    10, 10, 10, 10, 10, 10, 10,
    10, 10,  0, 10,  0, 10, 10,
    10,  0, 10, 10, 10,  0, 10,
    10, 10,  0, 10,  0, 10, 10,
    10, 10, 10, 10, 10, 10, 10,
  ],
  "void" : [
    -1, -1, 11, -1, -1,
    -1, -1, 11, -1, -1,
    11, 11, 11, 11, 11,
    -1, -1, 11, -1, -1,
    -1, -1, 11, -1, -1,
  ],
  "mouseX" : [
    11, -1, 11, -1, -1, -1,
    11, -1, 11, -1, 11, 11,
    -1, 11, -1, -1, -1, -1,
    11, -1, 11, -1, 11, 11,
    11, -1, 11, -1, -1, -1,
  ],
  "mouseY" : [
    11, -1, 11, -1, -1, -1,
    11, -1, 11, -1, 11, 11,
    -1, 11, -1, -1, -1, -1,
    -1, 11, -1, -1, 11, 11,
    -1, 11, -1, -1, -1, -1,
 ],
  "dottedLine" : [
    1, -1, 1, -1, 1,
  ],
  "twoPoints" : [
    -1, 0, -1, 0, -1,
  ],
  "percentage" : [
     0,  0, -1, -1,  0,
     0, -1, -1,  0, -1,
    -1, -1,  0, -1, -1,
    -1,  0, -1, -1,  0,
     0, -1, -1,  0,  0,
  ],
};

let transparencyIcons = [
  [
    10, 11, 10, 11, 10,
    11, 10, 11, 10, 11,
    10, 11, 10, 11, 10,
    11, 10, 11, 10, 11,
    10, 11, 10, 11, 10,
  ],
  [
    11,  1, 11,  1, 11,
     1, 11,  1, 11,  1,
    11,  1, 11,  1, 11,
     1, 11,  1, 11,  1,
    11,  1, 11,  1, 11,
  ],
  [
     1,  0,  1,  0,  1,
     0,  1,  0,  1,  0,
     1,  0,  1,  0,  1,
     0,  1,  0,  1,  0,
     1,  0,  1,  0,  1,
  ],
  [
     0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,
  ],
]

let layerIcons = [
  [
    -1, -1,  1, -1, -1,
    -1,  1,  1, -1, -1,
    -1, -1,  1, -1, -1,
    -1, -1,  1, -1, -1,
    -1, -1,  1, -1, -1,
    -1,  1,  1,  1, -1,
  ],
  [
    -1,  1,  1,  1, -1,
     1, -1, -1, -1,  1,
    -1, -1, -1, -1,  1,
    -1,  1,  1,  1, -1,
     1, -1, -1, -1, -1,
     1,  1,  1,  1,  1,
  ],
  [
     1,  1,  1,  1, -1,
    -1, -1, -1, -1,  1,
    -1, -1,  1,  1, -1,
    -1, -1, -1, -1,  1,
    -1, -1, -1, -1,  1,
     1,  1,  1,  1, -1,
  ],
  [
    -1, -1,  1, -1,  1,
    -1,  1, -1, -1,  1,
     1, -1, -1, -1,  1,
     1,  1,  1,  1,  1,
    -1, -1, -1, -1,  1,
    -1, -1, -1, -1,  1,
  ]
];

let canvas = document.querySelector("canvas");
let W = canvas.width = 135; // minimum 135
let H = canvas.height = 192; // minimum 70     original 192
let frameLength = W * H;
let mouse = {
  x : 0,
  y : 0,
  scroll : 1,
  leftClick : false,
  rightClick : false,
};
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let clickedMouseX = 0;
let clickedMouseY = 0;
let realMouseX = 0;
let realMouseY = 0;
let mouseX = 2;
let mouseY = 66;
let zoom = 1;
let zoomDelta = 0;
let zoomOriginX = 0;
let zoomOriginY = 0;
let imageX = 135;
let imageY = 192;
let currentLayer = 3;
let currentTool = 0;
let currentColor1 = 0;
let currentColor2 = 10;
let currentTransparency = 3;
let windowButtonsOrder = ["X", "◻", "_", "?"];
let currentToolPalette = [0, 1, 2, 3, 9, 10];
let toolList = Object.keys(toolIcons);
let seeMoreDelays = [0, 0, 0, 0, 0, 0];

canvas.addEventListener("wheel", e => {}); // TODO : zoom
canvas.addEventListener("contextmenu", e => e.preventDefault());
canvas.addEventListener("mousedown", e => {
  if(e.button == 0) mouse.leftClick = true;
  else if(e.button == 2) mouse.rightClick = true;
});
window.addEventListener("mouseup", e => {
  if(e.button == 0) mouse.leftClick = false;
  else if(e.button == 2) mouse.rightClick = false;
});
canvas.addEventListener("mousemove", e => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});
canvas.addEventListener("scroll", e => {
  mouse.scroll = 0; // ??
});

let frame = new Uint8ClampedArray(frameLength * 4);
let pixelFrame = [];
let alphaFrame = [];

function setPixelXY(x, y, color, alpha) {
  let i = x + y * W;
  pixelFrame[i] = color;
  alphaFrame[i] = alpha;
}

function getImageFromFrame(x, y, w, h) {
  let final = [];
  let alphaFinal = [];
  for(let i = 0; i < w; i++) {
    for(let j = 0; j < h; j++) {
      let c = getColorAt(x + i, y + j);
      final[i + j * w] = c[0];
      alphaFinal[i + j * w] = c[1];
    }
  }
  return [final, alphaFinal];
}

function getColorAt(x, y) {
  if(x < 0 || x >= W || y < 0 || y >= H) return -2;
  let index = x + y * W;
  if(pixelFrame[index] == undefined) return [-1, 0];
  else return [pixelFrame[index], alphaFrame[index]];
}

function hLine(x, y, w, color, alpha) {
  for(let i = 0; i < w; i++) {
    setPixelXY(x + i, y, color, alpha);
  }
}

function vLine(x, y, h, color, alpha) {
  for(let i = 0; i < h; i++) {
    setPixelXY(x, y + i, color, alpha);
  }
}

function fillRect(x, y, w, h, color, alpha) {
  for(let i = 0; i < w; i++) {
    for(let j = 0; j < h; j++) {
      setPixelXY(x + i, y + j, color, alpha);
    }
  }
}

function lineRect(x, y, w, h, color, alpha) {
  let maxX = x + w - 1;
  let maxY = y + h - 1;
  for(let i = 1; i < w - 1; i++) {
    setPixelXY(x + i, y,    color, alpha);
    setPixelXY(x + i, maxY, color, alpha);
  }
  for(let i = 0; i < h; i++) {
    setPixelXY(x,    y + i, color, alpha);
    setPixelXY(maxX, y + i, color, alpha);
  }
}

function numberlength(n, bold) {
  let string = "" + Math.floor(n);
  let final = string.length * 4;
  if(!bold) {
    for(let i = 0; i < string.length; i++) {
      if(+string[i] == 1) final--;
    }
  }
  return final;
}

function number(x, y, n, bold, alpha) {
  let string = "" + Math.floor(n);
  let currentX = x;
  for(let i = 0; i < string.length; i++) {
    let digitIndex = +string[i];
    drawImage(currentX, y, (bold)? bigNumbers[digitIndex] : littleNumbers[digitIndex], 3, alpha);
    currentX += (!bold && digitIndex == 1)? 3 : 4;
  }
  return currentX;
}

function drawImage(X, Y, imageArray, w, alpha) {
  let h = Math.floor(imageArray.length / w);
  for(let x = 0; x < w; x++) {
    for(let y = 0; y < h; y++) {
      let color = imageArray[x + y * w];
      if(color > -1) setPixelXY(X + x, Y + y, color, alpha);
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

function line(x0, y0, x1, y1, color, alpha) {
  var dx = Math.abs(x1 - x0);
  var dy = Math.abs(y1 - y0);
  var sx = (x0 < x1) ? 1 : -1;
  var sy = (y0 < y1) ? 1 : -1;
  var err = dx - dy;

  while(true) {
    setPixelXY(x0, y0, color, alpha);

    if ((x0 === x1) && (y0 === y1)) break;
    var e2 = 2*err;
    if (e2 > -dy) { err -= dy; x0  += sx; }
    if (e2 < dx) { err += dx; y0  += sy; }
  }
}

function fillArea4(x, y, color, alpha) {
  let replaceColor = getColorAt(x, y);
  if(color == replaceColor) return;
  setPixelXY(x, y, color, alpha);
  if(getColorAt(x + 1, y) == replaceColor) fillArea4(x + 1, y, color, alpha);
  if(getColorAt(x - 1, y) == replaceColor) fillArea4(x - 1, y, color, alpha);
  if(getColorAt(x, y + 1) == replaceColor) fillArea4(x, y + 1, color, alpha);
  if(getColorAt(x, y - 1) == replaceColor) fillArea4(x, y - 1, color, alpha);
  return;
}

function fillArea8(x, y, color, alpha) {
  let replaceColor = getColorAt(x, y);
  if(color == replaceColor) return;
  setPixelXY(x, y, color, alpha);
  if(getColorAt(x + 1, y) == replaceColor)     fillArea8(x + 1, y, color, alpha);
  if(getColorAt(x - 1, y) == replaceColor)     fillArea8(x - 1, y, color, alpha);
  if(getColorAt(x, y + 1) == replaceColor)     fillArea8(x, y + 1, color, alpha);
  if(getColorAt(x, y - 1) == replaceColor)     fillArea8(x, y - 1, color, alpha);
  if(getColorAt(x + 1, y + 1) == replaceColor) fillArea8(x + 1, y + 1, color, alpha);
  if(getColorAt(x - 1, y + 1) == replaceColor) fillArea8(x - 1, y + 1, color, alpha);
  if(getColorAt(x + 1, y - 1) == replaceColor) fillArea8(x + 1, y - 1, color, alpha);
  if(getColorAt(x - 1, y - 1) == replaceColor) fillArea8(x - 1, y - 1, color, alpha);
  return;
}

function draw(dt) {

  // inputs

  realMouseX = Math.floor(W / canvas.offsetWidth * mouse.x);
  realMouseY = Math.floor(H / canvas.offsetHeight * mouse.y);
  let isMouseInCanvas = 1 < realMouseX && realMouseX < W - 2 && 65 < realMouseY && realMouseY < H - 2;
  let oldMouseX = mouseX;
  let oldMouseY = mouseY;
  if(isMouseInCanvas) {
    mouseX = realMouseX;
    mouseY = realMouseY;
  }

  // UI

  for(let i = 0; i < 4; i++) {
    let x = W - 11;
    let y = 18 + i * 9;
    if(mouse.leftClick && x <= realMouseX && realMouseX < x + 9 && y <= realMouseY && realMouseY < y + 10) currentLayer = i;
  }
  
  lineRect(0, 0, W, H, 11, 3);
  lineRect(1, 1, W - 2, H - 2, 1, 3);
  fillRect(2, 2, W - 4, 64, 10, 3);

  lineRect(2, 2, W - 4, 13, 8, 3);
  drawImage(4, 4, windowIcons.title, 77, 3);
  lineRect(3, 3, 79, 11, 8, 3);
  fillRect(82, 3, W - 133, 11, 8, 3);
  for(let i = 0; i < 4; i++) {
    let x = W - i * 12 - 14;
    if(mouse.leftClick && x <= realMouseX && realMouseX < x + 11 && 3 <= realMouseY && realMouseY < 14) fillRect(x, 3, 11, 11, 1, 3);
    else drawImage(x, 3, windowIcons.button, 11, 3);
    drawImage(x + 2, 5, windowIcons[windowButtonsOrder[i]], 7, 3);
    vLine(x - 1, 3, 11, 8, 3);
  }
  hLine(2, 15, W - 4, 1, 3);

  hLine(2, 16, W - 4, 11, 3);
  for(let i = 0; i < 6; i++) {
    let x = 3 + i * 20;
    let hasHitSeeMore = (x + 11 <= realMouseX && realMouseX < x + 19 && 30 <= realMouseY && realMouseY < 36);
    lineRect(x, 17, 19, 19, 1, 3);
    if(mouse.leftClick && x <= realMouseX && realMouseX < x + 19 && 17 <= realMouseY && realMouseY < 36 && !hasHitSeeMore) currentTool = currentToolPalette[i];
    else if(mouse.leftClick && (x + 15 <= realMouseX && realMouseX < x + 19 && 30 <= realMouseY && realMouseY < 36) && seeMoreDelays[i] == 0) { currentToolPalette[i] = (currentToolPalette[i] + 1 < toolList.length)? currentToolPalette[i] + 1 : 0; seeMoreDelays[i] = 10}
    else if(mouse.leftClick && (x + 11 <= realMouseX && realMouseX < x + 15 && 30 <= realMouseY && realMouseY < 36) && seeMoreDelays[i] == 0) { currentToolPalette[i] = (currentToolPalette[i] > 0)? currentToolPalette[i] - 1 : toolList.length - 1; seeMoreDelays[i] = 10}
    seeMoreDelays[i] = (seeMoreDelays[i] - 1 < 0)? 0 : seeMoreDelays[i] - 1;
    if(currentTool == currentToolPalette[i]) fillRect(x + 1, 18, 17, 17, 5, 3);
    drawImage(x + 2, 19, toolIcons[toolList[currentToolPalette[i]]], 15, 3);
    drawImage(x + 11, 30, windowIcons.seeMore, 7, 3);
    vLine(x - 1, 17, 19, 11, 3);
  }
  for(let j = 0; j < 2; j++) {
    for(let i = 0; i < 10; i++) {
      let index = j * 10 + i;
      let x = 3 + i * 10;
      let y = 37 + j * 10;
      if(mouse.leftClick && x <= realMouseX && realMouseX < x + 9 && y <= realMouseY && realMouseY < y + 9) currentColor1 = index;
      if(mouse.rightClick && x <= realMouseX && realMouseX < x + 9 && y <= realMouseY && realMouseY < y + 9) currentColor2 = index;
      lineRect(x, y, 9, 9, (currentColor1 == index)? 3 : (currentColor2 == index)? 7 : 1, 3);
      if(colors[index] != undefined) fillRect(x + 2, y + 2, 5, 5, index, 3);
      else drawImage(x + 2, y + 2, windowIcons.void, 5, 3);
      if(currentColor1 == index) hLine(x + 1, y + 4, 7, 3, 3);
      if(currentColor2 == index) vLine(x + 4, y + 1, 7, 7, 3);
      vLine(x - 1, y, 9, 11, 3);
    }
  }
  for(let j = 0; j < 2; j++) {
    for(let i = 0; i < 2; i++) {
      let x = 103 + i * 10;
      let y = 37 + j * 10;
      let index = i + j * 2;
      if(mouse.leftClick && x <= realMouseX && realMouseX < x + 9 && y <= realMouseY && realMouseY < y + 9) currentTransparency = index;
      drawImage(x + 2, y + 2, transparencyIcons[index], 5, 3);
      lineRect(x, y, 9, 9, (currentTransparency == index)? 6 : 1, 3);
      vLine(x - 1, y, 9, 11, 3);
    }
  }
  hLine(2, 36, W - 14, 11, 3);
  hLine(2, 46, W - 14, 11, 3);
  hLine(2, 56, W -  4, 11, 3);

  lineRect(W - 12, 18, 9, 37, 1, 3);
  for(let i = 0; i < 4; i++) {
    let x = W - 11;
    let y = 18 + i * 9;
    hLine(x, y, 7, 1, 3);
    if(i == currentLayer) fillRect(x, y + 1, 7, 8, 11, 3);
    drawImage(x + 1, y + 2, layerIcons[i], 5, 3);
  }
  lineRect(W - 13, 17, 11, 39, 11, 3);
  hLine(2, 57, W - 4, 1, 3);

  drawImage(3, 59, windowIcons.mouseX, 6, 3);
  let a = number(10, 59, mouseX - 2, false, 3);
  drawImage(a, 59, windowIcons.dottedLine, 1, 3);
  drawImage(a + 2, 59, windowIcons.mouseY, 6, 3);
  let b = number(a + 9, 59, mouseY - 66, false, 3);
  vLine(b, 58, 7, 1, 3);

  drawImage(W - 9, 59, windowIcons.percentage, 5, 3);
  let c = W - numberlength(zoom * 100) - 11;
  number(c + 2, 59, zoom * 100, false, 3);
  vLine(c, 58, 7, 1, 3);

  let d = Math.floor((b + c) / 2) - numberlength(imageX - 4);
  let e = number(d, 59, imageX - 4, false, 3);
  drawImage(e, 59, windowIcons.twoPoints, 1, 3);
  number(e + 2, 59, imageY - 68, false, 3);

  hLine(2, 65, W - 4, 1, 3);

  // tools
  let tool = toolList[currentTool];

  // pencil
  if     (tool == "pencil" && isMouseInCanvas && mouse.rightClick) line(oldMouseX, oldMouseY, mouseX, mouseY, currentColor2, currentTransparency);
  else if(tool == "pencil" && isMouseInCanvas && mouse.leftClick)  line(oldMouseX, oldMouseY, mouseX, mouseY, currentColor1, currentTransparency);
  // bucket
  else if(tool == "bucket" && isMouseInCanvas && mouse.rightClick) fillArea4(mouseX, mouseY, currentColor2, currentTransparency);
  else if(tool == "bucket" && isMouseInCanvas && mouse.leftClick)  fillArea4(mouseX, mouseY, currentColor1, currentTransparency);
  // bucketPlus
  else if(tool == "bucketPlus" && isMouseInCanvas && mouse.rightClick) fillArea8(mouseX, mouseY, currentColor2, currentTransparency);
  else if(tool == "bucketPlus" && isMouseInCanvas && mouse.leftClick)  fillArea8(mouseX, mouseY, currentColor1, currentTransparency);
  // rubber
  else if(tool == "rubber" && isMouseInCanvas && mouse.rightClick) line(oldMouseX, oldMouseY, mouseX, mouseY, -1, 0);
  else if(tool == "rubber" && isMouseInCanvas && mouse.leftClick)  line(oldMouseX, oldMouseY, mouseX, mouseY, -1, 0);


  let currentDrawing = getImageFromFrame(2, 66, W - 4, H - 4);

  // what happens here won't be saved onto the canvas + it will be on the foreground, we can do previews

  for(let i = 0; i < pixelFrame.length; i++) {
    let index = i * 4;
    if(pixelFrame[i] >= 0 && pixelFrame[i] < colors.length) {
      let color = pixelFrame[i] * 3;
      frame[index]     = colors[color];
      frame[index + 1] = colors[color + 1];
      frame[index + 2] = colors[color + 2];
      frame[index + 3] = transparencies[alphaFrame[i]];
    }
    else {
      frame[index]     = 0;
      frame[index + 1] = 0;
      frame[index + 2] = 0;
      frame[index + 3] = 0;
    }
  }

  // ctx.clearRect(0,0,W,H);
  ctx.putImageData(new ImageData(frame, W, H), 0, 0);

  // pixelFrame = [];
  // alphaFrame = [];
  // drawImage(2, 66, currentDrawing, W - 4, 3);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
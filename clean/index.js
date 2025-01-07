var color = (ir, ig, ib, ia) => { return {r : ir, g : ig, b : ib, a : ia} };
var matrix = () => { return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]};

var parameters = {
  h : 500,
  w : 700,
  zoom : 1,
  offsetX : 0,
  offsetY : 0,
  fNear : 0.1,
  fFar : 1000,
  fFov : 90,
}

document.body.style.margin = "0px";
var canvas = document.createElement("canvas");
canvas.width = parameters.w;
canvas.height = parameters.h;
canvas = document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// Projection Matrix
var fAspectRatio = parameters.h / parameters.w;
var fFovRad = 1 / Math.tan(parameters.fFov * 0.5 / 180 * Math.PI);

matProj = matrix();

matProj[0][0] = fAspectRatio * fFovRad;
matProj[1][1] = fFovRad;
matProj[2][2] = parameters.fFar / (parameters.fFar - parameters.fNear);
matProj[3][2] = (-parameters.fFar * parameters.fNear) / (parameters.fFar - parameters.fNear);
matProj[2][3] = 1;
matProj[3][3] = 0;

var rotationmatrix = (x, y, z) => {
  // https://en.wikipedia.org/wiki/Rotation_matrix#General_rotations
  // second matrix
  let cosx = Math.cos(x);
  let cosy = Math.cos(y);
  let cosz = Math.cos(z);
  let sinx = Math.sin(x);
  let siny = Math.sin(y);
  let sinz = Math.sin(z);
  return [
    [ cosy * cosz, sinx * siny * cosz - cosx * sinz, cosx * siny * cosz + sinx * sinz ],
    [ cosy * sinz, sinx * siny * sinz + cosx * cosz, cosx * siny * sinz - sinx * cosz ],
    [ -siny      , sinx * cosy                     , cosx * cosy                      ],
  ];
};

Math.multvecmat4 = (vec, mat) => {
  let final = [
    vec[0] * mat[0][0] + vec[1] * mat[1][0] + vec[2] * mat[2][0] + mat[3][0],
    vec[0] * mat[0][1] + vec[1] * mat[1][1] + vec[2] * mat[2][1] + mat[3][1],
    vec[0] * mat[0][2] + vec[1] * mat[1][2] + vec[2] * mat[2][2] + mat[3][2],
  ];
  let w = vec[0] * mat[0][3] + vec[1] * mat[1][3] + vec[2] * mat[2][3] + mat[3][3];

  if (w != 0) { final[0] /= w; final[1] /= w; final[2] /= w; }

  return final;
};

Math.multvecmat3 = (vec, mat) => {
  let final = [
    vec[0] * mat[0][0] + vec[1] * mat[1][0] + vec[2] * mat[2][0],
    vec[0] * mat[0][1] + vec[1] * mat[1][1] + vec[2] * mat[2][1],
    vec[0] * mat[0][2] + vec[1] * mat[1][2] + vec[2] * mat[2][2],
  ];

  return final;
};

var painter = {};

painter.clear = () => {ctx.clearRect(0,0,parameters.w,parameters.h);}

painter.frame = ctx.createImageData(parameters.w, parameters.h);

painter.new = () => { painter.frame = ctx.createImageData(parameters.w, parameters.h) };

painter.send = () => { ctx.putImageData(painter.frame, 0, 0); };

painter.setpixel = (a, c) => {
  let index = (a[0] + a[1] * painter.frame.width);
  painter.frame.data[index * 4 + 0] = c.r;
  painter.frame.data[index * 4 + 1] = c.g;
  painter.frame.data[index * 4 + 2] = c.b;
  painter.frame.data[index * 4 + 3] = c.a;
};

painter.line = (a, b, c) => {
  // Bresenham's Line Algorithm
  // https://www.uobabylon.edu.iq/eprints/publication_2_22893_6215df
  // https://imgur.com/a/2uT7LaV
  
  let incX = Math.sign(b[0] - a[0]);
  let dX = Math.abs(b[0] - a[0]);
  
  let incY = Math.sign(b[1] - a[1]);
  let dY = Math.abs(b[1] - a[1]);

  let XaY = dX > dY;
  let cmpt = Math.max(dX, dY);
  let incD = -2 * Math.abs(dX - dY);
  let incS = 2 * Math.min(dX, dY);

  let err = incD + cmpt;
  let X = a[0];
  let Y = a[1];

  while(cmpt >= 0)
  {
    let x = Math.ceil(X);
    let y = Math.ceil(Y);
  
    painter.setpixel([x, y], c);
  
    cmpt -= 1.0;
    if (err >= 0 || XaY)
      X += incX;
    if (err >= 0 || !XaY)
      Y += incY;
    if (err >= 0)
      err += incD;
    else
      err += incS;
  }
};

meshCube = [
  // SOUTH
  [ [0, 0, 0],    [0, 1, 0],    [1, 1, 0] ],
  [ [0, 0, 0],    [1, 1, 0],    [1, 0, 0] ],

  // EAST                                                      
  [ [1, 0, 0],    [1, 1, 0],    [1, 1, 1] ],
  [ [1, 0, 0],    [1, 1, 1],    [1, 0, 1] ],

  // NORTH                                                     
  [ [1, 0, 1],    [1, 1, 1],    [0, 1, 1] ],
  [ [1, 0, 1],    [0, 1, 1],    [0, 0, 1] ],

  // WEST                                                      
  [ [0, 0, 1],    [0, 1, 1],    [0, 1, 0] ],
  [ [0, 0, 1],    [0, 1, 0],    [0, 0, 0] ],

  // TOP                                                       
  [ [0, 1, 0],    [0, 1, 1],    [1, 1, 1] ],
  [ [0, 1, 0],    [1, 1, 1],    [1, 1, 0] ],

  // BOTTOM                                                    
  [ [1, 0, 1],    [0, 0, 1],    [0, 0, 0] ],
  [ [1, 0, 1],    [0, 0, 0],    [1, 0, 0] ],
];

let vec1 = [0, 0];
let vec2 = [parameters.w, parameters.h];
let col1 = color(0, 0, 255, 255);

painter.line(vec1, vec2, col1);

var theta = 0;

function newFrame(elapsedTime) {
  painter.clear();
  painter.new();

  theta += 1.0 * elapsedTime;

  let matRot = rotationmatrix(theta, 0, 0);

  // Draw triangles
  for(let i = 0; i < meshCube.length; i++) {
    let newtri = [[0,0,0],[0,0,0],[0,0,0]];
    let tri = meshCube[i];

    // Offset to gravity center
    // manually, TODO : make a mesh generator with .gravitycenter
    //                : make a face generator with .gravitycenter
    let a = -0.5;
    newtri[0][0] = tri[0][0] + a;
    newtri[0][1] = tri[0][1] + a;
    newtri[0][2] = tri[0][2] + a;
    newtri[1][0] = tri[1][0] + a;
    newtri[1][1] = tri[1][1] + a;
    newtri[1][2] = tri[1][2] + a;
    newtri[2][0] = tri[2][0] + a;
    newtri[2][1] = tri[2][1] + a;
    newtri[2][2] = tri[2][2] + a;
  
    // Rotate
    newtri[0] = Math.multvecmat3(newtri[0], matRot);
    newtri[1] = Math.multvecmat3(newtri[1], matRot);
    newtri[2] = Math.multvecmat3(newtri[2], matRot);
  
    // Offset into the screen
    newtri[0][0] = newtri[0][0] + 3;
    newtri[1][0] = newtri[1][0] + 3;
    newtri[2][0] = newtri[2][0] + 3;
    // newtri[0][1] = newtri[0][1] + 3;
    // newtri[1][1] = newtri[1][1] + 3;
    // newtri[2][1] = newtri[2][1] + 3;
    newtri[0][2] = newtri[0][2] + 3;
    newtri[1][2] = newtri[1][2] + 3;
    newtri[2][2] = newtri[2][2] + 3;
    
    // Project triangles from 3D --> 2D
    newtri[0] = Math.multvecmat4(newtri[0], matProj);
    newtri[1] = Math.multvecmat4(newtri[1], matProj);
    newtri[2] = Math.multvecmat4(newtri[2], matProj);
    
    // Scale into view
    newtri[0][0] += 1; newtri[0][1] += 1;
    newtri[1][0] += 1; newtri[1][1] += 1;
    newtri[2][0] += 1; newtri[2][1] += 1;
    
    newtri[0][0] *= 0.5 * parameters.w; newtri[0][1] *= 0.5 * parameters.h;
    newtri[1][0] *= 0.5 * parameters.w; newtri[1][1] *= 0.5 * parameters.h;
    newtri[2][0] *= 0.5 * parameters.w; newtri[2][1] *= 0.5 * parameters.h;
    
    painter.line(newtri[0], newtri[1], col1);
    painter.line(newtri[1], newtri[2], col1);
    painter.line(newtri[2], newtri[0], col1);
  }
  painter.send();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// main loop
async function main() {
  var tp1 = Date.now();
  var tp2;
  while(true) {
    // Deltatime
    tp2 = Date.now();
    let elapsedTime = (tp2 - tp1) / 1000;
    tp1 = tp2;
  
    newFrame(elapsedTime);
    await sleep(0)
  }
}
main();
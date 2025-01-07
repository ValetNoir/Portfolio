var camera = [0, 0, 0];
var yaw = 0;
var xaw = 0;
var up = [0, 1, 0];
var lookDir = [0, 0, 1];
var viewOffset = [1, 1, 0];
var lighting = v_nrml([0, 0, -1]);
var mouse_sensivity = 0.05;

class InputManager {
  callbacks; currentlyPressedKeys; mouseVelocity; mousePos;

  constructor(inputHandler) {
    this.callbacks = {};
    this.currentlyPressedKeys = {};
    this.mouseVelocity = [0, 0];
    this.mousePos = [0, 0];

    inputHandler.addEventListener("keydown", e => { e.preventDefault(); this.onKeyDown(e.key); });
    inputHandler.addEventListener("keyup", e => { e.preventDefault(); this.onKeyUp(e.key); });
    inputHandler.addEventListener("mousedown", e => { e.preventDefault(); this.onKeyDown("mouse" + e.button); });
    inputHandler.addEventListener("mouseup", e => { e.preventDefault(); this.onKeyUp("mouse" + e.button); });

    inputHandler.addEventListener("mousemove", e => { e.preventDefault(); this.onMouseMove(e); this.onKeyDown("mousemove")});
  }

  addListener(key, callbackStart, callbackEnd) {
    this.callbacks[key] = [callbackStart, callbackEnd];
  }

  deleteListener(key) {
    this.callbacks[key] = undefined;
  }

  onKeyDown(key) {
    this.currentlyPressedKeys[key] = true;
  }

  onKeyUp(key) {
    this.currentlyPressedKeys[key] = false;
    if(this.callbacks[key]) this.callbacks[key][1]();
  }

  onMouseMove(e) {
    this.mouseVelocity = [e.movementX, e.movementY];
    this.mousePosition = [e.x, e.y];
  }

  checksCallbacks(deltatime) {
    Object.keys(this.currentlyPressedKeys).forEach((key) => {
      if(this.currentlyPressedKeys[key] && this.callbacks[key]) this.callbacks[key][0](deltatime, this.mouseVelocity, this.mousePos);
      if(this.currentlyPressedKeys["mousemove"]) this.currentlyPressedKeys["mousemove"] = false;;
    });
  }
}

class RessourceManager {
  ressources;

  constructor(ressources_keys, ressources_filepaths) {
    this.ressources = [];
    for(let i = 0; i < ressources_filepaths.length; i++) {
      this.ressources[ressources_keys[i]] = new Ressource(ressources_filepaths[i]);
    }
  }

  hasLoaded() {
    let final = true;
    Object.keys(this.ressources).forEach((key) => {
      if(!this.ressources[key].hasLoaded) final = false;
    });
    return final;
  }
}

class Ressource {
  value; hasLoaded;

  constructor(filepath) {
    this.hasLoaded = false;

    fetch(filepath)
    .then(response => response.text())
    .then(text => {
      this.value = text;
      this.hasLoaded = true;
    });
  }
}

class Graph {
  painter; span; varname; linecolor; previous_values; avg;

  constructor(logger_div, varname, linecolor, titlecolor) {
    let div = logger_div.appendChild(document.createElement("div"));
    let span = document.createElement("div");
    span.innerHTML = varname;
    span.style.backgroundColor = titlecolor;
    span.style.border = "1px solid black";
    this.span = div.appendChild(span);
    this.painter = new Painter(new Context(div, 300, 100));
    this.linecolor = linecolor;
    this.varname = varname;
    this.previous_values = [];
    this.avg = 1;
  }

  plot(value) {
    this.span.innerHTML = this.varname + " (avg: " + this.avg + ")";
    this.painter.new_frame();
    this.previous_values.unshift(value);
    this.avg = round(average((this.previous_values.length > 50)? this.previous_values.slice(0, 50) : this.previous_values), 1);
    if(this.previous_values.length > 1) {
      let middle = this.painter.context.width - 10;
      let h = this.painter.context.height;
      for(let i = 0; i < this.previous_values.length; i++) {
        this.painter.line([-i + middle, h - this.previous_values[i]], [-(i + 1) + middle, h - this.previous_values[i + 1]], this.linecolor);
      }
      if(this.previous_values.length > middle) this.previous_values.pop();
    }
    this.painter.send_frame();
  }
}

class Logger {
  div; span; vars; graphs;

  constructor(color) {
    let div = document.createElement("div");
    div.style.backgroundColor = color;
    div.style.position = "absolute";
    div.style.top = 0;
    div.style.left = 0;
    div.style.border = "1px solid black";
    this.div = document.body.appendChild(div);
    this.span = this.div.appendChild(document.createElement("div"));
    this.vars = {};
    this.graphs = {};
  }

  addGraph(varname, linecolor, titlecolor) {
    this.graphs[varname] = new Graph(this.div, varname, linecolor, titlecolor);
  } 

  setVar(varname, value) {
    this.vars[varname] = value;
  }

  display() {
    this.span.innerHTML = "";
    Object.keys(this.vars).forEach((key) => {
      let value = this.vars[key];
      this.span.innerHTML = this.span.innerHTML + key + " : " + value + "</br>";
      if(this.graphs[key]) {
        this.graphs[key].plot(value);
      }
    });
  }
}

class Context {
  ctx; width; height;

  constructor(appender, w, h) {
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.backgroundColor = "white";
    canvas = appender.appendChild(canvas);
    this.ctx = canvas.getContext("2d");
    this.width = w;
    this.height = h;
  }
}

class Painter {
  context; frame; w; h;

  constructor(context) { this.context = context; this.w = this.context.width; this.h = this.context.height; }
  
  clear_frame() { this.context.ctx.clearRect(0, 0, this.w, this.h); }

  new_frame() { this.frame = this.context.ctx.createImageData(this.w, this.h);  }

  send_frame() { this.context.ctx.putImageData(this.frame, 0, 0); }

  setpixel(a, c) {
    if(a[0] >= this.w || a[1] >= this.h || a[0] < 0 || a[1] < 0) return;
    let index = (a[0] + a[1] * this.w);
    this.frame.data[index * 4 + 0] = c[0];
    this.frame.data[index * 4 + 1] = c[1];
    this.frame.data[index * 4 + 2] = c[2];
    this.frame.data[index * 4 + 3] = c[3];
  }

  fill(a, b, color) {
    let vx = (a[0] <= b[0])? [a[0], b[0]] : [b[0], a[0]];
    let vy = (a[1] <= b[1])? [a[1], b[1]] : [b[1], a[1]];
    for(let x = vx[0]; x <= vx[1]; x++) {
      for(let y = vy[0]; y <= vy[1]; y++) {
        this.setpixel([x, y], color);
      } 
    }
  }

  h_line(x1, x2, y1, color) {
    let min = Math.ceil((x1 < x2)? x1 : x2) - 1;
    let max = Math.ceil((x1 < x2)? x2 : x1) + 1;
    let y = Math.ceil(y1);
    for(let x = min; x < max; x++) { this.setpixel([x, y], color); }
  }

  line(a, b, color) {
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

    while(cmpt >= 0) {
      let x = Math.ceil(X);
      let y = Math.ceil(Y);
    
      this.setpixel([x, y], color);
    
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
  }

  point(a, color) {
    this.line([a[0] - 10, a[1]], [a[0] + 10, a[1]], color);
    this.line([a[0], a[1] - 10], [a[0], a[1] + 10], color);
  }

  drawFaces(triangles, fov, near, far, color) {
    let matProj = m4_projection(this.w, this.h, fov, near, far);
    
    let target = [0, 0, 1];
    lookDir = m4_mul_v(target, m4_rotationX(xaw));
    lookDir = m4_mul_v(lookDir, m4_rotationY(yaw));
    target = v_add_v(camera, lookDir);
    let matCamera = m4_pointAt(camera, target, up);
    let matView = m4_quickInverse(matCamera);

    for(let i = 0; i < triangles.length; i++) {
      let triangle = triangles[i];

      let normal = t_nrml(triangle);

      let cameraRay = v_sub_v(triangle[0], camera);

      if(v_dot(normal, cameraRay) >= 0) continue;

      // World Space => View Space
      triangle[0] = m4_mul_v(triangle[0], matView);
      triangle[1] = m4_mul_v(triangle[1], matView);
      triangle[2] = m4_mul_v(triangle[2], matView);

      let clippedTriangles = t_clip([0, 0, .1], [0, 0, 1], triangle);

      for(let i = 0; i < clippedTriangles.length; i++) {
        let clippedTriangle = clippedTriangles[i];

        // Project triangles from 3D --> 2D
        clippedTriangle[0] = m4_mul_v(clippedTriangle[0], matProj);
        clippedTriangle[1] = m4_mul_v(clippedTriangle[1], matProj);
        clippedTriangle[2] = m4_mul_v(clippedTriangle[2], matProj);

        // Unflipping X and Y axis
        clippedTriangle[0][0] *= -1;
        clippedTriangle[1][0] *= -1;
        clippedTriangle[2][0] *= -1;
        clippedTriangle[0][1] *= -1;
        clippedTriangle[1][1] *= -1;
        clippedTriangle[2][1] *= -1;

        // Scale into view
        clippedTriangle[0] = v_add_v(clippedTriangle[0], viewOffset)
        clippedTriangle[1] = v_add_v(clippedTriangle[1], viewOffset)
        clippedTriangle[2] = v_add_v(clippedTriangle[2], viewOffset)
        var viewCenter = [0.5 * this.context.width, 0.5 * this.context.height, 1];
        clippedTriangle[0] = v_mul_v(clippedTriangle[0], viewCenter);
        clippedTriangle[1] = v_mul_v(clippedTriangle[1], viewCenter);
        clippedTriangle[2] = v_mul_v(clippedTriangle[2], viewCenter);

        let triangles1 = t_clip([0, 0, 0], [0, 1, 0], clippedTriangle);
        for(let i1 = 0; i1 < triangles1.length; i1++) {
          let triangles2 = t_clip([0, this.h - 1, 0], [0, -1, 0], triangles1[i1]);
          for(let i2 = 0; i2 < triangles2.length; i2++) {
            let triangles3 = t_clip([0, 0, 0], [1, 0, 0], triangles2[i2]);
            for(let i3 = 0; i3 < triangles3.length; i3++) {
              let triangles4 = t_clip([this.w - 1, 0, 0], [-1, 0, 0], triangles3[i3]);
              for(let i4 = 0; i4 < triangles4.length; i4++) {
                // Illumination
                let dp = v_dot(normal, lighting);
                let triangleColor = [dp * color[0], dp * color[1], dp * color[2], color[3]];
                this.fillTriangle(triangles4[i4], triangleColor);
                this.lineTriangle(triangles4[i4], triangleColor);
                // this.lineTriangle(triangles4[i4], [0, 0, 0, 255]);
              }
            }
          }
        }
      }
    }
  }

  lineTriangle(triangle, color) {
    let v1 = triangle[0];
    let v2 = triangle[1];
    let v3 = triangle[2];
    this.line(v1, v2, color);
    this.line(v2, v3, color);
    this.line(v3, v1, color);
  }

  fillBottomFlatTriangle(triangle, color) {
    let v1 = triangle[0];
    let v2 = triangle[1];
    let v3 = triangle[2];
    let invslope1 = (v2[0] - v1[0]) / (v2[1] - v1[1]);
    let invslope2 = (v3[0] - v1[0]) / (v3[1] - v1[1]);

    let x1 = v1[0];
    let x2 = v1[0];

    for(let scanlineY = Math.ceil(v1[1]); scanlineY < Math.ceil(v2[1]); scanlineY++) {
      this.h_line(x1, x2, scanlineY, color);
      x1 += invslope1;
      x2 += invslope2;
    }
  }

  fillTopFlatTriangle(triangle, color) {
    let v1 = triangle[0];
    let v2 = triangle[1];
    let v3 = triangle[2];
    let invslope1 = (v1[0] - v3[0]) / (v1[1] - v3[1]);
    let invslope2 = (v2[0] - v3[0]) / (v2[1] - v3[1]);

    let x1 = v3[0];
    let x2 = v3[0];

    for(let scanlineY = Math.ceil(v3[1]); scanlineY > Math.ceil(v1[1]); scanlineY--) {
      this.h_line(x1, x2, scanlineY, color);
      x1 -= invslope1;
      x2 -= invslope2;
    }
  }

  fillTriangle(triangle, color) {
    let tri = t_sort(triangle);
    let v1 = tri[0], v2 = tri[1], v3 = tri[2];

    let v4 = [v1[0] + ((v2[1] - v1[1]) / (v3[1] - v1[1])) * (v3[0] - v1[0]), v2[1]];
    this.fillTopFlatTriangle([v2, v4, v3], color);
    this.line(v2, v4, color)
    this.fillBottomFlatTriangle([v1, v2, v4], color);
  }
}

class Mesh {
  vertices; faces; textureVertices; textureFaces; textures; position; rotation; velocity; rotation_velocity; origin;

  constructor(vertices, faces, textureVertices, textureFaces, textures, position, rotation, velocity, rotation_velocity, origin) {
    this.vertices = vertices;
    this.faces = faces;
    this.textureVertices = textureVertices;
    this.textureFaces = textureFaces;
    this.textures = textures;
    this.position = position;
    this.rotation = rotation;
    this.velocity = velocity;
    this.rotation_velocity = rotation_velocity;
    this.origin = (origin)? origin : this.getGravityCenter();
  }

  loadFromObjString(string) {
    this.vertices = [];
    this.faces = [];
    let lines = string.split("\n");
    for(let i = 0; i < lines.length; i++) {
      let line = lines[i].split(" ");
      if(line[0] == "v") {
        this.vertices.push([line[1]*1, line[2]*1, line[3]*1]);
      } else if(line[0] == "f") {
        this.faces.push([line[1]*1 - 1, line[2]*1 - 1, line[3]*1 - 1]);
      }
    }
  }

  getGravityCenter() {
    let gravityCenter = [0, 0, 0];
    for(let i = 0; i < this.vertices.length; i++) {
      gravityCenter[0] += this.vertices[i][0];
      gravityCenter[1] += this.vertices[i][1];
      gravityCenter[2] += this.vertices[i][2];
    }
    gravityCenter[0] /= this.vertices.length;
    gravityCenter[1] /= this.vertices.length;
    gravityCenter[2] /= this.vertices.length;

    return gravityCenter;
  }

  getDrawTriangles() {
    let triangles = [];

    let matWorld = m4_identity();
    matWorld = m4_mul_m4(matWorld, m4_rotationX(this.rotation[0]));
    matWorld = m4_mul_m4(matWorld, m4_rotationY(this.rotation[1]));
    matWorld = m4_mul_m4(matWorld, m4_rotationZ(this.rotation[2]));
    matWorld = m4_mul_m4(matWorld, m4_translation(this.position));
    
    for(let i = 0; i < this.faces.length; i++) {
      // Offset to origin
      let triangle = [
        [ this.vertices[this.faces[i][0]][0] - this.origin[0], this.vertices[this.faces[i][0]][1] - this.origin[1], this.vertices[this.faces[i][0]][2] - this.origin[2] ],
        [ this.vertices[this.faces[i][1]][0] - this.origin[0], this.vertices[this.faces[i][1]][1] - this.origin[1], this.vertices[this.faces[i][1]][2] - this.origin[2] ],
        [ this.vertices[this.faces[i][2]][0] - this.origin[0], this.vertices[this.faces[i][2]][1] - this.origin[1], this.vertices[this.faces[i][2]][2] - this.origin[2] ],
      ];

      // Transform
      triangle[0] = m4_mul_v(triangle[0], matWorld);
      triangle[1] = m4_mul_v(triangle[1], matWorld);
      triangle[2] = m4_mul_v(triangle[2], matWorld);

      triangles[i] = triangle;
    }

    return triangles;
  }

  move(elapsedTime) { this.position = v_add_v(this.position, v_mul_n(this.velocity, elapsedTime)); }

  rotate(elapsedTime) { this.rotation = v_add_v(this.rotation, v_mul_n(this.rotation_velocity, elapsedTime)); }
}




// utils

function m4_mul_v(v, m) { return v_div_n([v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0] + m[3][0], v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1] + m[3][1], v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2] + m[3][2]], v_dot(v, [m[0][3], m[1][3], m[2][3]]) + m[3][3]); }
function m4_mul_m4(m1, m2) {let m = m4_blank(); for(let i = 0; i < 4; i++) { for(let j = 0; j < 4; j++) { m[j][i] = m1[j][0] * m2[0][i] + m1[j][1] * m2[1][i] + m1[j][2] * m2[2][i] + m1[j][3] * m2[3][i]; } } return m; }
function m4_blank() { return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; }
function m4_filled() { return [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]; }
function m4_identity() { return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]; }
function m4_projection(w, h, fov, near, far) { let aspectRatio = h / w; let scale = 1 / Math.tan(fov* Math.PI / 360 ); return [[aspectRatio * scale, 0, 0, 0], [0, scale, 0, 0], [0, 0, far / (far - near), 1], [0, 0, -far * near / (far - near), 0]]; }
function m4_translation(vec) { return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[vec[0],vec[1],vec[2],1]]; }
function m4_rotationX(theta) { let c = Math.cos(theta); let s = Math.sin(theta); return [[1,0,0,0],[0,c,s,0],[0,-s,c,0],[0,0,0,1]]; }
function m4_rotationY(theta) { let c = Math.cos(theta); let s = Math.sin(theta); return [[c,0,s,0],[0,1,0,0],[-s,0,c,0],[0,0,0,1]]; }
function m4_rotationZ(theta) { let c = Math.cos(theta); let s = Math.sin(theta); return [[c,s,0,0],[-s,c,0,0],[0,0,1,0],[0,0,0,1]]; }
function m4_pointAt(p, t, u) { let nf = v_nrml(v_sub_v(t, p)); let nu = v_nrml(v_sub_v(u, v_mul_n(nf, v_dot(u, nf)))); let nr = v_cross(nu, nf); return [[nr[0], nr[1], nr[2], 0], [nu[0], nu[1], nu[2], 0], [nf[0], nf[1], nf[2], 0], [p[0], p[1], p[2], 1]]; }
function m4_quickInverse(m) { return [[m[0][0],m[1][0],m[2][0],0],[m[0][1],m[1][1],m[2][1],0],[m[0][2],m[1][2],m[2][2],0],[-v_dot(m[0],m[3]),-v_dot(m[1],m[3]),-v_dot(m[2],m[3]),1]]; }

function m3_mul_v(v, m) { return [v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0], v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1], v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2]]; }
function m3_rotation(vec) { let cx = Math.cos(vec[0]); let cy = Math.cos(vec[1]); let cz = Math.cos(vec[2]); let sx = Math.sin(vec[0]); let sy = Math.sin(vec[1]); let sz = Math.sin(vec[2]); return [[(cy * cz), sx * sy * cz - cx * sz, cx * sy * cz + sx * sz], [cy * sz, (sx * sy * sz + cx * cz), cx * sy * sz - sx * cz], [-sy, sx * cy, (cx * cy)]]; };

function t_blank() { return [[0,0,0],[0,0,0],[0,0,0]]; }
function t_sort(t) { return t.sort((a, b) => a[1] - b[1]); }
function t_nrml(t) { return v_nrml(v_cross(v_sub_v(t[1], t[0]), v_sub_v(t[2], t[0]))); }
function t_avg(t) { return [ (t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3, (t[0][2] + t[1][2] + t[2][2]) / 3 ]}
function t_clip(p_p, p_n, t) {
  p_n = v_nrml(p_n);
  let subber = v_dot(p_n, p_p);
  let i_p = [];
  let o_p = [];
  let i_t = [];
  let o_t = [];

  // Get signed distance of each point in triangle to plane
  let d0 = v_dot(p_n, t[0]) - subber;
  let d1 = v_dot(p_n, t[1]) - subber;
  let d2 = v_dot(p_n, t[2]) - subber;

  if (d0 >= 0) { i_p.push(t[0]); } else { o_p.push(t[0]); }
  if (d1 >= 0) { i_p.push(t[1]); } else { o_p.push(t[1]); }
  if (d2 >= 0) { i_p.push(t[2]); } else { o_p.push(t[2]); }

  if (i_p.length == 0) { return []; }
  if (i_p.length == 3) { return [t]; }
  if (i_p.length == 1 && o_p.length == 2) { return [[i_p[0], v_intersect(p_p, p_n, i_p[0], o_p[0]), v_intersect(p_p, p_n, i_p[0], o_p[1])]]; }
  if (i_p.length == 2 && o_p.length == 1) { let ot2 = v_intersect(p_p, p_n, i_p[0], o_p[0]); return [[i_p[0], i_p[1], ot2], [i_p[1], ot2, v_intersect(p_p, p_n, i_p[1], o_p[0])]]; }
}

function v_blank() { return [0,0,0,1]; }
function v_add_v(v1, v2) { return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]; }
function v_sub_v(v1, v2) { return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]; }
function v_mul_v(v1, v2) { return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]]; }
function v_div_v(v1, v2) { return [v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2]]; }
function v_add_n(v, k) { return [v[0] + k, v[1] + k, v[2] + k]; }
function v_sub_n(v, k) { return [v[0] - k, v[1] - k, v[2] - k]; }
function v_mul_n(v, k) { return [v[0] * k, v[1] * k, v[2] * k]; }
function v_div_n(v, k) { return (k == 0)? v : [v[0] / k, v[1] / k, v[2] / k]; }
function v_dot(v1, v2) { return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] *  v2[2]; }
function v_len(v) { return Math.sqrt(v_dot(v, v)); }
function v_nrml(v) { return v_div_n(v, v_len(v)); }
function v_cross(v1, v2) { return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]]; }
function v_ceil(vec) { return [ Math.ceil(vec[0]), Math.ceil(vec[1]), Math.ceil(vec[2])]; }
function v_floor(vec) { return [ Math.floor(vec[0]), Math.floor(vec[1]), Math.floor(vec[2])]; }
function v_round(vec) { return [ Math.round(vec[0]), Math.round(vec[1]), Math.round(vec[2])]; }
function v_intersect(plane_p, plane_n, lineStart, lineEnd) { plane_n = v_nrml(plane_n); let ad = v_dot(lineStart, plane_n); let t = (v_dot(plane_n, plane_p) - ad) / (v_dot(lineEnd, plane_n) - ad); return [v_add_v(lineStart, v_mul_n(v_sub_v(lineEnd, lineStart), t)), t]; }

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function average(array) { let total = 0; array.forEach(n => total += n); return total / array.length; }
function round(n, powOfTen) { let m = pow(10, powOfTen); return Math.round(n * m) / m; }
function pow(n, pow) { let final = n; if(pow == 0) return 1; for(let i = 0; i < pow; i++) {final *= final}; return final; }
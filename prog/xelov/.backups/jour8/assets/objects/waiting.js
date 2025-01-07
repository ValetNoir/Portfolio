let minus_x_good = (x - 1) > -1;
let minus_y_good = (y - 1) > -1;
let minus_z_good = (z - 1) > -1;

// this.chunks[x - 1][y][z].blocks;
if(minus_x_good) {
  map[CHUNK_SIZE] = [];
  map[CHUNK_SIZE] = this.chunks[x - 1][y][z].blocks[0];
} else {
  map[CHUNK_SIZE] = [];
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[CHUNK_SIZE][i] = [];
    for(let j = 0; j < CHUNK_SIZE; j++) {
      map[CHUNK_SIZE][i][j] = -0.5;
    }
  }
}
// this.chunks[x][y][z - 1].blocks;
if(minus_z_good) {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    for(let j = 0; j < CHUNK_SIZE; j++) {
      map[i][j][CHUNK_SIZE] = this.chunks[x][y][z - 1].blocks[i][j][0];
    }
  }
} else {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    for(let j = 0; j < CHUNK_SIZE; j++) {
      map[i][j][CHUNK_SIZE] = -0.5;
    }
  }
}
// this.chunks[x][y - 1][z].blocks;
if(minus_y_good) {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[i][CHUNK_SIZE] = this.chunks[x][y - 1][z].blocks[i][0];
  }
} else {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[i][CHUNK_SIZE] = [];
    for(let j = 0; j < CHUNK_SIZE; j++) {
      map[i][CHUNK_SIZE][j] = -0.5;
    }
  }
}
// this.chunks[x - 1][y - 1][z].blocks;
if(minus_x_good && minus_y_good) {
  map[CHUNK_SIZE][CHUNK_SIZE] = this.chunks[x - 1][y - 1][z].blocks[0][0];
} else {
  map[CHUNK_SIZE][CHUNK_SIZE] = [];
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[CHUNK_SIZE][CHUNK_SIZE][i] = -0.5;
  }
}
// this.chunks[x][y - 1][z - 1].blocks;
if(minus_y_good && minus_z_good) {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[i][CHUNK_SIZE][CHUNK_SIZE] = this.chunks[x][y - 1][z - 1].blocks[i][0][0];
  }
} else {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[i][CHUNK_SIZE][CHUNK_SIZE] = -0.5;
  }
}
// this.chunks[x - 1][y][z - 1].blocks;
if(minus_x_good && minus_z_good) {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[CHUNK_SIZE][i][CHUNK_SIZE] = this.chunks[x - 1][y][z - 1].blocks[0][i][0];
  }
} else {
  for(let i = 0; i < CHUNK_SIZE; i++) {
    map[CHUNK_SIZE][i][CHUNK_SIZE] = -0.5;
  }
}
// this.chunks[x - 1][y - 1][z - 1].blocks;
if(minus_x_good && minus_y_good && minus_z_good) {
  map[CHUNK_SIZE][CHUNK_SIZE][CHUNK_SIZE] = this.chunks[x - 1][y - 1][z - 1].blocks[0][0][0];
} else {
  map[CHUNK_SIZE][CHUNK_SIZE][CHUNK_SIZE] = -0.5;
}
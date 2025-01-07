function Chunk() {
  this.blocks;
  this.materials;
  this.mesh;

  this.generateBlocks = (chunkOffX, chunkOffY, chunkOffZ, noise) => {
    let xoff = chunkOffX * CHUNK_SIZE * NOISE_INCREMENT;
    this.blocks = [];
    for(let i = 0; i < CHUNK_SIZE; i++) {
      let yoff = chunkOffY * CHUNK_SIZE * NOISE_INCREMENT;
      this.blocks[i] = [];
      for(let j = 0; j < CHUNK_SIZE; j++) {
        let zoff = chunkOffZ * CHUNK_SIZE * NOISE_INCREMENT;
        this.blocks[i][j] = [];
        for(let k = 0; k < CHUNK_SIZE; k++) {
          let value = noise.get(xoff, yoff, zoff);
          // let a = VERTICAL_FADE / (10 - (j + chunkOffY * CHUNK_SIZE));
          // a = (Number.isNaN(a))? 0.5 : a;
          // a = (!Number.isFinite(a))? 0 : a;
          // if( a > 0.5 || a < -0.5) console.log(a, j);
          this.blocks[i][j][k] = (value - 0.5);
          zoff += NOISE_INCREMENT;
        }
        yoff += NOISE_INCREMENT;
      }
      xoff += NOISE_INCREMENT;
    }
  }

  this.setBlock = (x, y, z, value) => {
    this.blocks[x][y][z] = value;
    if(this.blocks[x][y][z] > 0.5) this.blocks[x][y][z] = 0.5;
    if(this.blocks[x][y][z] < -0.5) this.blocks[x][y][z] = -0.5;
  }

  this.changeBlock = (x, y, z, value) => {
    this.blocks[x][y][z] += value;
    if(this.blocks[x][y][z] > 0.5) this.blocks[x][y][z] = 0.5;
    if(this.blocks[x][y][z] < -0.5) this.blocks[x][y][z] = -0.5;
  }

  this.setMaterial = (x, y, z, material) => {
    this.materials[x][y][z] = material;
  }
}
function Chunk() {
  this.blocks;
  this.mesh;

  this.generateBlocks = (xl, yl, zl, increment, chunkOffX, chunkOffY, chunkOffZ, noise) => {
    console.log("generating chunk at", chunkOffX, chunkOffY, chunkOffZ);
    this.blocks = [];
    let xoff = chunkOffX;
    for(let i = 0; i < xl; i++) {
      let yoff = chunkOffY;
      this.blocks[i] = [];
      for(let j = 0; j < yl; j++) {
        let zoff = chunkOffZ;
        this.blocks[i][j] = [];
        for(let k = 0; k < zl; k++) {
          let value = noise.get(xoff, yoff, zoff);
          // let a = VERTICAL_FADE / (10 - (j + chunkOffY * CHUNK_SIZE));
          // a = (Number.isNaN(a))? 0.5 : a;
          // a = (!Number.isFinite(a))? 0 : a;
          // if( a > 0.5 || a < -0.5) console.log(a, j);
          this.blocks[i][j][k] = (value - 0.5);
          zoff += increment;
        }
        yoff += increment;
      }
      xoff += increment;
    }
  }
}
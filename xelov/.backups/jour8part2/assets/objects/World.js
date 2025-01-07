function World(seed) {
  this.noise = new perlinNoise3d();
  this.noise.noiseSeed(seed);
  this.chunks;
  // this.loadedChunks = {};

  this.generateChunks = (xl, yl, zl) => {
    this.chunks = [];
    for(let i = 0; i < zl; i++) {
      this.chunks[i] = [];
      for(let j = 0; j < yl; j++) {
        this.chunks[i][j] = [];
        for(let k = 0; k < zl; k++) {
          this.generateChunk(i, j, k);
        }
      }
    }
    for(let i = 0; i < zl; i++) {
      for(let j = 0; j < yl; j++) {
        for(let k = 0; k < zl; k++) {
          this.makeChunkMesh(i, j, k);
        }
      }
    }
  }

  this.generateChunk = (x, y, z) => {
    this.chunks[x][y][z] = new Chunk();
    this.chunks[x][y][z].generateBlocks(
      x, y, z, // chunk coordinates, if that was not super duper obvious
      this.noise // again, just read the name of the variable you stupid
    );
  }

  this.generateMesh = (x, y, z) => {
    console.log("generating mesh for", x, y, z)
    let map = this.chunks[x][y][z].blocks;

    let x_good = (x + 1) < WORLD_SIZE;
    let y_good = (y + 1) < WORLD_SIZE;
    let z_good = (z + 1) < WORLD_SIZE;

    // this.chunks[x + 1][y][z].blocks;
    if(x_good) {
      map[CHUNK_SIZE] = [];
      map[CHUNK_SIZE] = this.chunks[x + 1][y][z].blocks[0];
    } else {
      map[CHUNK_SIZE] = [];
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[CHUNK_SIZE][i] = [];
        for(let j = 0; j < CHUNK_SIZE; j++) {
          map[CHUNK_SIZE][i][j] = -0.5;
        }
      }
    }
    // this.chunks[x][y][z + 1].blocks;
    if(z_good) {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        for(let j = 0; j < CHUNK_SIZE; j++) {
          map[i][j][CHUNK_SIZE] = this.chunks[x][y][z + 1].blocks[i][j][0];
        }
      }
    } else {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        for(let j = 0; j < CHUNK_SIZE; j++) {
          map[i][j][CHUNK_SIZE] = -0.5;
        }
      }
    }
    // this.chunks[x][y + 1][z].blocks;
    if(y_good) {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[i][CHUNK_SIZE] = this.chunks[x][y + 1][z].blocks[i][0];
      }
    } else {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[i][CHUNK_SIZE] = [];
        for(let j = 0; j < CHUNK_SIZE; j++) {
          map[i][CHUNK_SIZE][j] = -0.5;
        }
      }
    }
    // this.chunks[x + 1][y + 1][z].blocks;
    if(x_good && y_good) {
      map[CHUNK_SIZE][CHUNK_SIZE] = this.chunks[x + 1][y + 1][z].blocks[0][0];
    } else {
      map[CHUNK_SIZE][CHUNK_SIZE] = [];
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[CHUNK_SIZE][CHUNK_SIZE][i] = -0.5;
      }
    }
    // this.chunks[x][y + 1][z + 1].blocks;
    if(y_good && z_good) {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[i][CHUNK_SIZE][CHUNK_SIZE] = this.chunks[x][y + 1][z + 1].blocks[i][0][0];
      }
    } else {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[i][CHUNK_SIZE][CHUNK_SIZE] = -0.5;
      }
    }
    // this.chunks[x + 1][y][z + 1].blocks;
    if(x_good && z_good) {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[CHUNK_SIZE][i][CHUNK_SIZE] = this.chunks[x + 1][y][z + 1].blocks[0][i][0];
      }
    } else {
      for(let i = 0; i < CHUNK_SIZE; i++) {
        map[CHUNK_SIZE][i][CHUNK_SIZE] = -0.5;
      }
    }
    // this.chunks[x + 1][y + 1][z + 1].blocks;
    if(x_good && y_good && z_good) {
      map[CHUNK_SIZE][CHUNK_SIZE][CHUNK_SIZE] = this.chunks[x + 1][y + 1][z + 1].blocks[0][0][0];
    } else {
      map[CHUNK_SIZE][CHUNK_SIZE][CHUNK_SIZE] = -0.5;
    }

    let geometry = generateMarchingCubesGeometry(map, USELERP);
    // let material = new THREE.MeshPhongMaterial({ color: 0x0055ff, side: THREE.DoubleSide });

    let material = new THREE.ShaderMaterial({
      uniforms: {},
      // vertexShader: document.getElementById('terrain/vertexShader').textContent,
      vertexShader: `
      varying  vec3 v_Normal;

      void main() {
        // col = vec3(1, 0, 1);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        v_Normal = normal;
      }
      `,
      // fragmentShader: document.getElementById('terrain/fragmentShader').textContent
      fragmentShader: `
      varying  vec3 v_Normal;

      void main() {
        gl_FragColor = vec4(v_Normal, 1.0);
      }
      `
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x * CHUNK_SIZE, y * CHUNK_SIZE, z * CHUNK_SIZE);
    
    this.chunks[x][y][z].mesh = mesh;
  }

  this.makeChunkMesh = (x, y, z) => {
    this.deleteChunkMesh(x, y, z);
    this.generateMesh(x, y, z);
    this.addChunkMesh(x, y, z);
  }

  this.addChunkMesh = (x, y, z) => {
    let key = `${x},${y},${z}`;
    this.chunks[x][y][z].mesh.name = key;
    scene.add(this.chunks[x][y][z].mesh);
  }

  this.deleteChunkMesh = (x, y, z) => {
    let key = `${x},${y},${z}`;

    let object = scene.getObjectByName(key);
    if(!object) return;

    object.geometry.dispose();
    object.material.dispose();
    scene.remove(object);
  }

  this.brush = (worldX, worldY, worldZ, brush) => {
    let chunkX = Math.floor(worldX / CHUNK_SIZE);
    let chunkY = Math.floor(worldY / CHUNK_SIZE);
    let chunkZ = Math.floor(worldZ / CHUNK_SIZE);
    let blockX = Math.round(worldX % CHUNK_SIZE);
    let blockY = Math.round(worldY % CHUNK_SIZE);
    let blockZ = Math.round(worldZ % CHUNK_SIZE);

    if(chunkX >= WORLD_SIZE || chunkY >= WORLD_SIZE || chunkZ >= WORLD_SIZE || chunkX < 0 || chunkY < 0 || chunkZ < 0) return;
    if(blockX >= CHUNK_SIZE || blockY >= CHUNK_SIZE || blockZ >= CHUNK_SIZE || blockX < 0 || blockY < 0 || blockZ < 0) return;

    this.chunks[chunkX][chunkY][chunkZ].blocks[blockX][blockY][blockZ] += brush.center;
    if(this.chunks[chunkX][chunkY][chunkZ].blocks[blockX][blockY][blockZ] > 0.5) this.chunks[chunkX][chunkY][chunkZ].blocks[blockX][blockY][blockZ] = 0.5;
    if(this.chunks[chunkX][chunkY][chunkZ].blocks[blockX][blockY][blockZ] < -0.5) this.chunks[chunkX][chunkY][chunkZ].blocks[blockX][blockY][blockZ] = -0.5;
    
    this.makeChunkMesh(chunkX, chunkY, chunkZ);
    
    let good_x = (chunkX + 1) < WORLD_SIZE && blockX == (CHUNK_SIZE - 1);
    let good_y = (chunkY + 1) < WORLD_SIZE && blockY == (CHUNK_SIZE - 1);
    let good_z = (chunkZ + 1) < WORLD_SIZE && blockZ == (CHUNK_SIZE - 1);

    let good_minus_x = (chunkX - 1) > - 1 && blockX == 0;
    let good_minus_y = (chunkY - 1) > - 1 && blockY == 0;
    let good_minus_z = (chunkZ - 1) > - 1 && blockZ == 0;

    // side reload
    if(good_x) this.makeChunkMesh(chunkX + 1, chunkY, chunkZ);
    if(good_y) this.makeChunkMesh(chunkX, chunkY + 1, chunkZ);
    if(good_z) this.makeChunkMesh(chunkX, chunkY, chunkZ + 1);
    if(good_minus_x) this.makeChunkMesh(chunkX - 1, chunkY, chunkZ);
    if(good_minus_y) this.makeChunkMesh(chunkX, chunkY - 1, chunkZ);
    if(good_minus_z) this.makeChunkMesh(chunkX, chunkY, chunkZ - 1);
    // edges reload
    if(good_x && good_y) this.makeChunkMesh(chunkX + 1, chunkY + 1, chunkZ);
    if(good_x && good_z) this.makeChunkMesh(chunkX + 1, chunkY, chunkZ + 1);
    if(good_y && good_z) this.makeChunkMesh(chunkX, chunkY + 1, chunkZ + 1);
    if(good_minus_x && good_y) this.makeChunkMesh(chunkX - 1, chunkY + 1, chunkZ);
    if(good_minus_x && good_z) this.makeChunkMesh(chunkX - 1, chunkY, chunkZ + 1);
    if(good_minus_y && good_x) this.makeChunkMesh(chunkX + 1, chunkY - 1, chunkZ);
    if(good_minus_y && good_z) this.makeChunkMesh(chunkX, chunkY - 1, chunkZ + 1);
    if(good_minus_z && good_x) this.makeChunkMesh(chunkX + 1, chunkY, chunkZ - 1);
    if(good_minus_z && good_y) this.makeChunkMesh(chunkX, chunkY + 1, chunkZ - 1);
    if(good_minus_x && good_minus_y) this.makeChunkMesh(chunkX - 1, chunkY - 1, chunkZ);
    if(good_minus_x && good_minus_z) this.makeChunkMesh(chunkX - 1, chunkY, chunkZ - 1);
    if(good_minus_y && good_minus_z) this.makeChunkMesh(chunkX, chunkY - 1, chunkZ - 1);
    // corner reload
    if(good_x && good_y && good_z) this.makeChunkMesh(chunkX + 1, chunkY + 1, chunkZ + 1);
    if(good_minus_x && good_y && good_z) this.makeChunkMesh(chunkX - 1, chunkY + 1, chunkZ + 1);
    if(good_x && good_minus_y && good_z) this.makeChunkMesh(chunkX + 1, chunkY - 1, chunkZ + 1);
    if(good_x && good_y && good_minus_z) this.makeChunkMesh(chunkX + 1, chunkY + 1, chunkZ - 1);
    if(good_minus_x && good_minus_y && good_z) this.makeChunkMesh(chunkX - 1, chunkY - 1, chunkZ + 1);
    if(good_x && good_minus_y && good_minus_z) this.makeChunkMesh(chunkX + 1, chunkY - 1, chunkZ - 1);
    if(good_minus_x && good_y && good_minus_z) this.makeChunkMesh(chunkX - 1, chunkY + 1, chunkZ - 1);
    if(good_minus_x && good_minus_y && good_minus_z) this.makeChunkMesh(chunkX + 1, chunkY + 1, chunkZ + 1);
  }
}
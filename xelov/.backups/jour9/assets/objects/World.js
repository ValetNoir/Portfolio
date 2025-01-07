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
    // console.log("generating chunk at", chunkOffX, chunkOffY, chunkOffZ);
    this.chunks[x][y][z] = new Chunk();
    this.chunks[x][y][z].generateBlocks(
      x, y, z, // chunk coordinates, if that was not super duper obvious
      this.noise // again, just read the name of the variable you stupid
    );
  }

  this.generateMesh = (x, y, z) => {
    // console.log("generating mesh for", x, y, z)
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
    let material = new THREE.MeshPhongMaterial({ color: 0x0055ff, side: THREE.DoubleSide });

    // let material = new THREE.ShaderMaterial({
    //   uniforms: {},
    //   // vertexShader: document.getElementById('terrain/vertexShader').textContent,
    //   vertexShader: `
    //   varying  vec3 v_Normal;

    //   void main() {
    //     // col = vec3(1, 0, 1);
    //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //     v_Normal = normal;
    //   }
    //   `,
    //   // fragmentShader: document.getElementById('terrain/fragmentShader').textContent
    //   fragmentShader: `
    //   varying  vec3 v_Normal;

    //   void main() {
    //     gl_FragColor = vec4(v_Normal, 1.0);
    //   }
    //   `
    // });

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
  
  this.brush = (worldX, worldY, worldZ, extend, value) => {
    let hitX = worldX % CHUNK_SIZE;
    let hitY = worldY % CHUNK_SIZE;
    let hitZ = worldZ % CHUNK_SIZE;

    var toLoad = [];
    function queue(x, y, z) {
      toLoad.push(JSON.stringify([x, y, z]));
    }

    for(let i = -extend; i < extend; i++) {
      for(let j = -extend; j < extend; j++) {
        for(let k = -extend; k < extend; k++) {
          let blockX = Math.round(hitX + i);
          blockX = (blockX < CHUNK_SIZE)? blockX : blockX - CHUNK_SIZE;
          blockX = (blockX > -1)? blockX : CHUNK_SIZE + blockX;
          let blockY = Math.round(hitY + j);
          blockY = (blockY < CHUNK_SIZE)? blockY : blockY - CHUNK_SIZE;
          blockY = (blockY > -1)? blockY : CHUNK_SIZE + blockY;
          let blockZ = Math.round(hitZ + k);
          blockZ = (blockZ < CHUNK_SIZE)? blockZ : blockZ - CHUNK_SIZE;
          blockZ = (blockZ > -1)? blockZ : CHUNK_SIZE + blockZ;
          let chunkX = Math.floor(Math.round(worldX + i) / CHUNK_SIZE);
          let chunkY = Math.floor(Math.round(worldY + j) / CHUNK_SIZE);
          let chunkZ = Math.floor(Math.round(worldZ + k) / CHUNK_SIZE);
          if(chunkX < WORLD_SIZE && chunkY < WORLD_SIZE && chunkZ < WORLD_SIZE && chunkX > -1 && chunkY > -1 && chunkZ > -1) {
            if(!(blockX < CHUNK_SIZE && blockY < CHUNK_SIZE && blockZ < CHUNK_SIZE && blockX > -1 && blockY > -1 && blockZ > -1)) {
              // console.log("fuck something got really wrong", blockX, blockY, blockZ)
              continue;
            }

            let dist = Math.sqrt(i * i + j * j + k * k);
            let applied_value = (dist < extend)? (extend - dist) * value : 0;
            this.chunks[chunkX][chunkY][chunkZ].changeBlock(blockX, blockY, blockZ, applied_value);
            queue(chunkX, chunkY, chunkZ);
            
            let good_x = (chunkX + 1) < WORLD_SIZE && blockX == (CHUNK_SIZE - 1);
            let good_y = (chunkY + 1) < WORLD_SIZE && blockY == (CHUNK_SIZE - 1);
            let good_z = (chunkZ + 1) < WORLD_SIZE && blockZ == (CHUNK_SIZE - 1);
            let good_minus_x = (chunkX - 1) > - 1 && blockX == 0;
            let good_minus_y = (chunkY - 1) > - 1 && blockY == 0;
            let good_minus_z = (chunkZ - 1) > - 1 && blockZ == 0;
  
            // side reload
            if(good_x) queue(chunkX + 1, chunkY, chunkZ);
            if(good_y) queue(chunkX, chunkY + 1, chunkZ);
            if(good_z) queue(chunkX, chunkY, chunkZ + 1);
            if(good_minus_x) queue(chunkX - 1, chunkY, chunkZ);
            if(good_minus_y) queue(chunkX, chunkY - 1, chunkZ);
            if(good_minus_z) queue(chunkX, chunkY, chunkZ - 1);
            // edges reload
            if(good_x && good_y) queue(chunkX + 1, chunkY + 1, chunkZ);
            if(good_x && good_z) queue(chunkX + 1, chunkY, chunkZ + 1);
            if(good_y && good_z) queue(chunkX, chunkY + 1, chunkZ + 1);
            if(good_minus_x && good_y) queue(chunkX - 1, chunkY + 1, chunkZ);
            if(good_minus_x && good_z) queue(chunkX - 1, chunkY, chunkZ + 1);
            if(good_minus_y && good_x) queue(chunkX + 1, chunkY - 1, chunkZ);
            if(good_minus_y && good_z) queue(chunkX, chunkY - 1, chunkZ + 1);
            if(good_minus_z && good_x) queue(chunkX + 1, chunkY, chunkZ - 1);
            if(good_minus_z && good_y) queue(chunkX, chunkY + 1, chunkZ - 1);
            if(good_minus_x && good_minus_y) queue(chunkX - 1, chunkY - 1, chunkZ);
            if(good_minus_x && good_minus_z) queue(chunkX - 1, chunkY, chunkZ - 1);
            if(good_minus_y && good_minus_z) queue(chunkX, chunkY - 1, chunkZ - 1);
            // corner reload
            if(good_x && good_y && good_z) queue(chunkX + 1, chunkY + 1, chunkZ + 1);
            if(good_minus_x && good_y && good_z) queue(chunkX - 1, chunkY + 1, chunkZ + 1);
            if(good_x && good_minus_y && good_z) queue(chunkX + 1, chunkY - 1, chunkZ + 1);
            if(good_x && good_y && good_minus_z) queue(chunkX + 1, chunkY + 1, chunkZ - 1);
            if(good_minus_x && good_minus_y && good_z) queue(chunkX - 1, chunkY - 1, chunkZ + 1);
            if(good_x && good_minus_y && good_minus_z) queue(chunkX + 1, chunkY - 1, chunkZ - 1);
            if(good_minus_x && good_y && good_minus_z) queue(chunkX - 1, chunkY + 1, chunkZ - 1);
            if(good_minus_x && good_minus_y && good_minus_z) queue(chunkX + 1, chunkY + 1, chunkZ + 1);
          }
        }
      }
    }

    toLoad = [...new Set(toLoad)];
    for(let coo of toLoad) {
      coo = JSON.parse(coo);
      if(
        coo[0] < WORLD_SIZE &&
        coo[1] < WORLD_SIZE &&
        coo[2] < WORLD_SIZE &&
        coo[0] > - 1 &&
        coo[1] > - 1 &&
        coo[2] > - 1
      ) {
        this.makeChunkMesh(coo[0], coo[1], coo[2]);
      }
    }
  }
}
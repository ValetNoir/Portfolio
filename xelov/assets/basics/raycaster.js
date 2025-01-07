function clickToWorld(screenX, screenY) {
  let raycaster = new THREE.Raycaster();
  let pointer = new THREE.Vector2();

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = ( screenX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( screenY / window.innerHeight ) * 2 + 1;

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  let intersect = raycaster.intersectObjects(scene.children);

  let x;
  let y;
  let z;
  
  if(intersect[0]) {
    // x = intersect[0].point.x;
    // y = intersect[0].point.y;
    // z = intersect[0].point.z;
    x = Math.round(intersect[0].point.x);
    y = Math.round(intersect[0].point.y);
    z = Math.round(intersect[0].point.z);
  }

  return {x: x, y: y, z: z};
}

function cameraLookAt() {
  let raycaster = new THREE.Raycaster();
  let pointer = new THREE.Vector2();

  pointer.x = 0;
  pointer.y = 0;

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  let intersect = raycaster.intersectObjects(scene.children);

  let x;
  let y;
  let z;
  
  if(intersect[0]) {
    // x = intersect[0].point.x;
    // y = intersect[0].point.y;
    // z = intersect[0].point.z;
    x = Math.round(intersect[0].point.x);
    y = Math.round(intersect[0].point.y);
    z = Math.round(intersect[0].point.z);
  }

  return {x: x, y: y, z: z};
}
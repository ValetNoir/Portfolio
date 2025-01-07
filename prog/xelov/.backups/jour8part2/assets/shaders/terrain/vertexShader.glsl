#version 300 es

void main() {
  // col = vec3(1, 0, 1);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
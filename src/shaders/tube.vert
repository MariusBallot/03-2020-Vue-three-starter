#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

varying vec2 vUv; 
uniform float u_time;

void main() {
  vUv = uv; 

  float n = snoise2(vec2(uv.x, u_time))*uv.x*0.1;

  vec4 modelViewPosition = modelViewMatrix * vec4(position+n, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}
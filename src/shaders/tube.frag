#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

varying vec2 vUv;
uniform float u_time; 
uniform sampler2D u_tex;


float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
	vec2 mUv = vec2(vUv.x+u_time*0.6, vUv.y+vUv.x*sin(u_time*0.1));
	vec4 tex = texture2D(u_tex, mUv);

	vec4 col = tex;
	col*=1./vUv.x;
  	gl_FragColor = col;
}
#version 300 ES
// Fragment Shader
precision mediump float;

// varyings
varying vec3 v_normal;

void main() {
  // calculate the brightness based on the normal
  float brightness = dot(normalize(v_normal), vec3(0.0, 0.0, 1.0));
  brightness = clamp(brightness, 0.0, 1.0);

  // output the color
  gl_FragColor = vec4(vec3(brightness), 1.0);
}

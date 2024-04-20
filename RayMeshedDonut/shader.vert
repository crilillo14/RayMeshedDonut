#version 300 ES
// Vertex Shader
precision mediump float;

// attributes
attribute vec3 a_position;
attribute vec3 a_normal;

// uniforms
uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_model;

// varyings
varying vec3 v_normal;

void main() {
  // transform the vertex position
  gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);

  // pass the normal to the fragment shader
  v_normal = a_normal;
}

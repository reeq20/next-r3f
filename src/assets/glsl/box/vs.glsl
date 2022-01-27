precision mediump float;
precision mediump int;

uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
attribute vec3 position;

void main(void) {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}
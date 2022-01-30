precision mediump float;
precision mediump int;

uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
attribute vec3 position, normal;

varying vec3 vNormal;
void main(void) {
    vNormal = normal;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}
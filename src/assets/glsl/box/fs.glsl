precision mediump float;
precision mediump int;

varying vec3 vNormal;
void main() {
    gl_FragColor = vec4(vNormal, 1);
}

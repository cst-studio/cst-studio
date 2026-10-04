varying vec3 vViewNormal;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    vViewNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * mvPosition;
}
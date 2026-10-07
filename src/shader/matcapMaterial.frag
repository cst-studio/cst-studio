uniform sampler2D uMatcap;
varying vec3 vViewNormal;
void main() {
    vec3 normal = normalize(vViewNormal);
    // Matcap UV from view-space normal
    vec2 uv = normal.xy * 0.5 + 0.5;
    vec3 color = texture2D(uMatcap, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
}
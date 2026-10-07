uniform float uTime;
uniform sampler2D uMatcap;
varying vec3 vViewNormal;
void main() {
    /*
    vec3 normal = normalize(vViewNormal);
    // Matcap UV from view-space normal
    vec2 uv = normal.xy * 0.5 + 0.5;
    vec3 color = texture2D(uMatcap, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
    */
/*
    vec3 normal = normalize(vViewNormal);
    vec2 uv = normal.xy * 0.5 + 0.5;
    float angle = uTime * 0.5;
    float c = cos(angle);
    float s = sin(angle);
    uv = uv - 0.5;
    uv = mat2(c, -s, s, c) * uv;
    uv += 0.5;
    vec3 color = texture2D(uMatcap, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
    */

    vec3 normal = normalize(vViewNormal);
    float angle = uTime * 0.05;
    mat2 rotation = mat2(
        cos(angle), -sin(angle),
        sin(angle),  cos(angle)
    );
    normal.xy = rotation * normal.xy;
    vec2 uv = normal.xy * 0.5 + 0.5;
    vec3 color = texture2D(uMatcap, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
}
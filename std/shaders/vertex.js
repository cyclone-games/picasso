import Shader from '../../core/Shader';

export default new Shader(Shader.types.vertex, `
    attribute vec2 a_position;
    attribute vec2 a_textureCoords;
    
    uniform mat3 u_matrix;
    uniform vec2 u_resolution;
    
    varying vec2 v_textureCoords;
    
    void main() {
        vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_textureCoords;
    }
`);

import Shader from '../core/Shader';

export default new Shader(Shader.types.fragment, `
    precision mediump float;

    uniform sampler2D u_image;
    varying vec2 v_textureCoords;

    void main() {
        gl_FragColor = texture2D(u_image, v_textureCoords);
    }
`);

import Shader from './Shader';

export default class Program {

    constructor (gl) {
        this.gl = gl;
        this.program = gl.createProgram();
        this.shaders = { };
    }

    add (shader) {
        const { attributes, compiled, uniforms } = shader.compile(this.gl);

        this.gl.attachShader(this.program, compiled);

        for (const attribute of attributes) {
            attribute.location = this.gl.getAttribLocation(this.program, attribute.id);
        }

        for (const uniform of uniforms) {
            uniform.location = this.gl.getUniformLocation(this.program, uniform.id);
        }

        this.shaders[ shader.type ] = shader;
    }

    link () {
        this.gl.linkProgram(this.program);
    }

    use () {
        this.gl.useProgram(this.program);
    }

    getAttribute (id) {

        for (const shader of Object.values(this.shaders)) {

            for (const attribute of shader.attributes) if (attribute.id === id) {
                return attribute;
            }
        }

        return null;
    }

    getUniform (id) {

        for (const shader of Object.values(this.shaders)) {

            for (const uniform of shader.uniforms) if (uniform.id === id) {
                return uniform;
            }
        }

        return null;
    }
}

export default class Program {

    constructor (gl, shaders) {
        this.gl = gl;
        this.program = null;
        this.shaders = shaders;
    }

    compile () {
        this.program = this.gl.createProgram();
        this.shaders = this.shaders.map(shader => shader.compile(this.gl));

        for (const { compiled } of this.shaders) {
            this.gl.attachShader(this.program, compiled);
            this.gl.linkProgram(this.program);
        }

        for (const { attributes, uniforms } of this.shaders) {

            for (const attribute of attributes) {
                attribute.location = this.gl.getAttribLocation(this.program, attribute.id);
            }

            for (const uniform of uniforms) {
                uniform.location = this.gl.getUniformLocation(this.program, uniform.id);
            }
        }
    }

    use () {
        this.gl.useProgram(this.program);
    }

    getAttribute (id) {

        for (const shader of this.shaders) {

            for (const attribute of shader.attributes) if (attribute.id === id) {
                return attribute;
            }
        }

        return null;
    }

    getUniform (id) {

        for (const shader of this.shaders) {

            for (const uniform of shader.uniforms) if (uniform.id === id) {
                return uniform;
            }
        }

        return null;
    }
}

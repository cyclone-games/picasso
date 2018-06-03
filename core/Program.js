export default class Program {

    constructor (shaders) {
        this.program = null;
        this.shaders = shaders;
    }

    compile (gl) {
        this.program = gl.createProgram();
        this.shaders = this.shaders.map(shader => shader.compile(gl));

        for (const { compiled } of this.shaders) {
            gl.attachShader(this.program, compiled);
        }
        
        gl.linkProgram(this.program);

        for (const { attributes, uniforms } of this.shaders) {

            for (const attribute of attributes) {
                attribute.location = gl.getAttribLocation(this.program, attribute.id);
                attribute.enable(gl);
            }

            for (const uniform of uniforms) {
                uniform.location = gl.getUniformLocation(this.program, uniform.id);
            }
        }
    }

    use (gl) {
        gl.useProgram(this.program);
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

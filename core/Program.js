module.exports = class Program {

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

        for (const { inputs, uniforms } of this.shaders) {

            for (const input of inputs) {
                input.location = gl.getAttribLocation(this.program, input.id);

                if (input.location > -1) {
                    input.enable(gl);
                }
                else {
                    inputs.splice(inputs.indexOf(input), 1);
                }
            }

            for (const uniform of uniforms) {
                uniform.location = gl.getUniformLocation(this.program, uniform.id);
            }
        }
    }

    use (gl) {
        gl.useProgram(this.program);
    }

    input (id) {

        for (const shader of this.shaders) {

            for (const input of shader.inputs) if (input.id === id) {
                return input;
            }
        }

        return null;
    }

    uniform (id) {

        for (const shader of this.shaders) {

            for (const uniform of shader.uniforms) if (uniform.id === id) {
                return uniform;
            }
        }

        return null;
    }
};

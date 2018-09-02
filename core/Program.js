module.exports = class Program {

    constructor (shaders) {
        this.program = null;
        this.shaders = shaders;
    }

    compile (gl) {
        this.program = gl.createProgram();
        this.shaders = this.shaders.map(shader => shader.compile(this, gl));

        for (const { compiled } of this.shaders) {
            gl.attachShader(this.program, compiled);
        }

        gl.linkProgram(this.program);

        for (const { inputs, uniforms } of this.shaders) {

            for (const input of inputs.values()) {
                input.location = gl.getAttribLocation(this.program, input.id);

                if (input.location > -1) {
                    input.enable(gl);
                }
                else {
                    inputs.delete(input.id);
                }
            }

            for (const uniform of uniforms.values()) {
                uniform.location = gl.getUniformLocation(this.program, uniform.id);
            }
        }
    }

    use (gl) {
        gl.useProgram(this.program);
    }

    input (id) {

        for (const shader of this.shaders) if (shader.inputs.has(id)) {
            return shader.inputs.get(this).get(id);
        }

        return null;
    }

    uniform (id) {

        for (const shader of this.shaders) if (shader.uniforms.has(id)) {
            return shader.uniforms.get(this).get(id);
        }

        return null;
    }
};

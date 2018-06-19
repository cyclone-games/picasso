const Input = require('./Input');
const Texture = require('./Texture');
const Uniform = require('./Uniform');

exports = class Shader {

    constructor (type, glsl, upgrade = true) {
        this.compiled = null;
        this.glsl = glsl;
        this.type = type;
        this.upgrade = upgrade;
        this.inputs = [ ];
        this.uniforms = [ ];
    }

    compile (gl) {
        const shader = gl.createShader(gl[ `${ this.type.toUpperCase() }_SHADER` ]);
        const inputs = this.glsl.match(new RegExp(Input.regex, 'g'));
        const uniforms = this.glsl.match(new RegExp(Uniform.regex, 'g'));

        if (this.upgrade) {
            this.glsl = `${ Shader.upgrade }${ this.glsl }`;
        }

        gl.shaderSource(shader, this.glsl);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error('Unable to compile shader: Please verify that your GLSL is valid');
        }

        if (inputs) for (const input of inputs) {
            const buffer = gl.createBuffer();
            const [ , , definition, id ] = input.match(Input.regex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.inputs.push(new Input(buffer, id, size, type));
        }

        if (uniforms) for (const uniform of uniforms) {
            const [ , , definition, id ] = uniform.match(Uniform.regex);
            const size = Number.parseInt(definition.match(/\d+/)[ 0 ], 10);
            const texture = definition.match(/sampler/) ? new Texture(size, gl.createTexture(), Texture.unit++) : null;
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.uniforms.push(new Uniform(id, size, texture, type));
        }

        this.compiled = shader;

        return this;
    }
};

exports.regex = /in (.+? )?(.+?) (.+?);/;
exports.upgrade = '    #version 300 es\n';

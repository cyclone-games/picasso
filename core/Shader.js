import Attribute from './Attribute';
import Texture from './Texture';
import Uniform from './Uniform';

export default class Shader {

    static prefix = '#version 300 es\n';
    static regex = /in (.+? )?(.+?) (.+?);/;

    attributes = [ ];
    uniforms = [ ];

    constructor (type, glsl) {
        this.compiled = null;
        this.glsl = glsl;
        this.type = type;
    }

    compile (gl, upgrade) {
        const shader = gl.createShader(gl[ `${ this.type.toUpperCase() }_SHADER` ]);
        const attributes = this.glsl.match(new RegExp(Attribute.regex, 'g'));
        const uniforms = this.glsl.match(new RegExp(Uniform.regex, 'g'));
        const variables = this.glsl.match(new RegExp(Shader.regex, 'g'));

        if ((attributes && !attributes.length && uniforms && !uniforms.length && variables && variables.length) || upgrade) {
            this.glsl = `${ Shader.prefix }${ this.glsl }`;
        }

        gl.shaderSource(shader, this.glsl);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error('Unable to compile shader: Please verify that your GLSL is valid');
        }

        if (attributes) for (const attribute of attributes) {
            const buffer = gl.createBuffer();
            const [ , , definition, id ] = attribute.match(Attribute.regex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.attributes.push(new Attribute(buffer, id, size, type));
        }

        if (uniforms) for (const uniform of uniforms) {
            const [ , , definition, id ] = uniform.match(Uniform.regex);
            const size = Number.parseInt(definition.match(/\d+/)[ 0 ], 10);
            const texture = definition.match(/sampler/) ? new Texture(Texture.unit++) : null;
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.uniforms.push(new Uniform(id, size, texture, type));
        }

        if (variables) for (const variable of variables) {
            const [ , , definition, id ] = variable.match(Shader.regex);
            const size = Number.parseInt(definition.match(/\d+/)[ 0 ], 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            switch (id.match(/^._/)[ 0 ]) {
                case Attribute.prefix: {
                    const buffer = gl.createBuffer();
                    this.attributes.push(new Attribute(buffer, id, size, type));
                    break;
                }
                case Uniform.prefix: {
                    const texture = definition.match(/sampler/) ? new Texture(Texture.unit++) : null;
                    this.uniforms.push(new Uniform(id, size, texture, type));
                    break;
                }
            }
        }

        this.compiled = shader;

        return this;
    }
}

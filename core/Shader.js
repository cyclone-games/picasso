import Attribute from './Attribute';
import Texture from './Texture';
import Uniform from './Uniform';

export default class Shader {

    attributes = [ ];
    uniforms = [ ];

    constructor (type, glsl) {
        this.compiled = null;
        this.glsl = glsl;
        this.type = type;
    }

    compile (gl) {
        const shader = gl.createShader(gl[ `${ this.type.toUpperCase() }_SHADER` ]);

        gl.shaderSource(shader, this.glsl);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error('Unable to compile shader: Please verify that your GLSL is valid');
        }

        const attributes = this.glsl.match(new RegExp(Attribute.regex, 'g'));
        const uniforms = this.glsl.match(new RegExp(Uniform.regex, 'g'));

        if (attributes) for (const attribute of attributes) {
            const buffer = gl.createBuffer();
            const [ , , definition, id ] = attribute.match(Attribute.regex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.attributes.push(new Attribute(buffer, gl, id, size, type));
        }

        if (uniforms) for (const uniform of uniforms) {
            const [ , , definition, id ] = uniform.match(Uniform.regex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const texture = definition.match(/sampler/) ? new Texture(this.gl, Texture.unit++) : null;
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.uniforms.push(new Uniform(gl, id, size, texture, type));
        }

        this.compiled = shader;

        return this;
    }
}

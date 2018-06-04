import Attribute from './Attribute';
import Texture from './Texture';
import Uniform from './Uniform';

export default class Shader {

    static regex = /in (.+? )?(.+?) (.+?);/;
    static upgrade = '    #version 300 es\n';

    attributes = [ ];
    uniforms = [ ];

    constructor (type, glsl, upgrade = true) {
        this.compiled = null;
        this.glsl = glsl;
        this.type = type;
        this.upgrade = upgrade;
    }

    compile (gl) {
        const shader = gl.createShader(gl[ `${ this.type.toUpperCase() }_SHADER` ]);
        const attributes = this.glsl.match(new RegExp(Attribute.regex, 'g'));
        const inputs = this.glsl.match(new RegExp(Shader.regex, 'g'));
        const uniforms = this.glsl.match(new RegExp(Uniform.regex, 'g'));

        if (this.upgrade) {
            this.glsl = `${ Shader.upgrade }${ this.glsl }`;
        }

        gl.shaderSource(shader, this.glsl);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error('Unable to compile shader: Please verify that your GLSL is valid');
        }

        if (attributes || inputs) for (const attribute of (attributes || inputs)) {
            const buffer = gl.createBuffer();
            const [ , , definition, id ] = (attribute.match(Attribute.regex) || attribute.match(Shader.regex));
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            if (!this.glsl.match(new RegExp(`out (.+? )?${ definition } ${ id };`))) {
                this.attributes.push(new Attribute(buffer, id, size, type));
            }
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
}

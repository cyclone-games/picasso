import Attribute from './Attribute';
import Uniform from './Uniform';

const attributeRegex = /attribute (.+? )?(.+?) (.+?);/;
const uniformRegex = /uniform (.+? )?(.+?) (.+?);/;

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

        for (const attribute of this.glsl.match(new RegExp(attributeRegex, 'g'))) {
            const buffer = gl.createBuffer();
            const [ , , definition, id ] = attribute.match(attributeRegex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.attributes.push(new Attribute(buffer, gl, id, size, type));
        }

        for (const uniform of this.glsl.match(new RegExp(uniformRegex, 'g'))) {
            const [ , , definition, id ] = uniform.match(uniformRegex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];

            this.uniforms.push(new Uniform(gl, id, size, type));
        }

        this.compiled = shader;

        return this;
    }
}

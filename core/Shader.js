const attributeRegex = /attribute (.+?) (.+?);/;
const uniformRegex = /uniform (.+?) (.+?);/;

export default class Shader {
    
    static types = {
        fragment: 'fragment',
        vertex: 'vertex'
    };

    attributes = [ ];
    uniforms = [ ];
    
    constructor (type, glsl) {
        
        if (!(type in Shader.types)) {
            throw new Error('Invalid shader type');
        }
        
        this.compiled = null;
        this.glsl = glsl;
        this.type = type;
    }

    compile (gl) {
        const shader = gl.createShader(gl[ `${ this.type.toUpperCase() }_SHADER` ]);
        
        gl.shaderSource(shader, this.glsl);
        gl.compileShader(shader);
        
        for (const attribute of this.glsl.match(new RegExp(attributeRegex, 'g'))) {
            const [ , definition, name ] = attribute.match(attributeRegex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];
            
            this.attributes.push({ name, size, type });
        }
        
        for (const uniform of this.glsl.match(new RegExp(uniformRegex, 'g'))) {
            const [ , definition, name ] = uniform.match(uniformRegex);
            const size = Number.parseInt(definition.match(/\d+/), 10);
            const type = definition.match(/(.+?)\d+/)[ 1 ];
            
            this.uniforms.push({ name, size, type });
        }
        
        this.compiled = shader;
        
        return this;
    }
}

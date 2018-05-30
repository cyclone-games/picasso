const attributeRegex = /attribute .+? (.+?);/;
const uniformRegex = /uniform .+? (.+?);/;

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
            this.attributes.push(attribute.match(attributeRegex)[ 1 ]);
        }
        
        for (const uniform of this.glsl.match(new RegExp(uniformRegex, 'g'))) {
            this.uniforms.push(uniform.match(uniformRegex)[ 1 ]);
        }
        
        this.compiled = shader;
        
        return this;
    }
}

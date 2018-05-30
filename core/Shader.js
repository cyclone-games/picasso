export default class Shader {
    
    static types = {
        fragment: 'fragment',
        vertex: 'vertex'
    };
    
    constructor (type, glsl) {
        
        if (!(type in Shader.types)) {
            throw new Error('Invalid shader type');
        }
        
        this.type = type;
        this.glsl = glsl;
    }

    compile (context) {
        const shader = context.createShader(`${ this.type.toUpperCase() }_SHADER`);
        
        context.shaderSource(shader, this.glsl);
        context.compileShader(shader);
        
        return shader;
    }
}

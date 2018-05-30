export default class Renderer {
    
    attributes = { };
    uniforms = { };
    
    constructor (canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2');
        this.program = this.context.createProgram();
    }
    
    initialize (shaders) {
        
        for (const shader of shaders) {
            const { attributes, compiled, uniforms } = shader.compile(this.gl);
            
            this.gl.attachShader(this.program, compiled);
            
            for (const attribute of attributes) {
                this.attributes[ attribute ] = this.gl.getAttribLocation(this.program, attribute);
            }
            
            for (const uniform of uniforms) {
                this.uniforms[ uniform ] = this.gl.getUniformLocation(this.program, uniform);
            }
        }
        
        this.gl.linkProgram(this.program);
    }
    
    render (renderable) {
        
    }
}

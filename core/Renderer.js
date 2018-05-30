export default class Renderer {
    
    attributes = { };
    buffers = { };
    uniforms = { };
    
    constructor (canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2');
        this.program = this.gl.createProgram();
    }
    
    initialize (shaders) {
        
        for (const shader of shaders) {
            const { attributes, compiled, uniforms } = shader.compile(this.gl);
            
            this.gl.attachShader(this.program, compiled);
            
            for (const attribute of attributes) {
                this.attributes[ attribute.name ] = this.gl.getAttribLocation(this.program, attribute.name);
                this.buffers[ attribute.name ] = this.gl.createBuffer();
                
                this.gl.enableVertexAttribArray(this.attributes[ attribute.name ]);
            }
            
            for (const uniform of uniforms) {
                this.uniforms[ uniform.name ] = this.gl.getUniformLocation(this.program, uniform.name);
            }
        }
        
        this.gl.useProgram(this.program);
    }
    
    render (renderable) {
        
    }
}

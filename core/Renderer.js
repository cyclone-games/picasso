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
                this.attributes[ attribute.name ] = {
                    location: this.gl.getAttribLocation(this.program, attribute.name),
                    size: attribute.size
                };
                
                this.buffers[ attribute.name ] = this.gl.createBuffer();
                
                this.gl.enableVertexAttribArray(this.attributes[ attribute.name ].location);
            }
            
            for (const uniform of uniforms) {
                this.uniforms[ uniform.name ] = {
                    location: this.gl.getUniformLocation(this.program, uniform.name),
                    size: uniform.size
                };
            }
        }
        
        this.gl.useProgram(this.program);
    }

    setAttribute (name, ...values) {
        const attribute = this.attributes[ name ];
              
        if (values.length !== attribute.size) {
            throw new Error(`Invalid number of values for ${ name }: Expected ${ attribute.size }, found ${ values.length }`);
        }
        
        // TODO
    }

    setUniform (name, ...values) {
        const uniform = this.uniforms[ name ];
              
        if (values.length !== uniform.size) {
            throw new Error(`Invalid number of values for ${ name }: Expected ${ uniform.size }, found ${ values.length }`);
        }
        
        // TODO
    }
    
    render (renderable) {
        // TODO
    }
}

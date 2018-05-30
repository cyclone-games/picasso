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
    }

    setUniform (name, ...values) {
        const uniform = this.uniforms[ name ];
        
        switch (uniform.type) {
            case 'mat': {
                return this.gl[ `uniformMatrix${ uniform.size }fv` ](uniform.location, false, values);
            }
            case 'vec': {
                return this.gl[ `uniform${ uniform.size }f` ](uniform.location, ...values);
            }
        }
    }
    
    render (renderable) {
        // TODO
    }
}

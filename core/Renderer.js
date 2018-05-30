export default class Renderer {
    
    constructor (canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('webgl2');
        this.program = this.context.createProgram();
    }
    
    render (renderable) {
        
    }
}

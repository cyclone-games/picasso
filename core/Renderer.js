export default class Renderer {
    
    constructor (canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('webgl');
    }
    
    render (renderable) {
        
    }
}

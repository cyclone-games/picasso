import Shader from './core/shader';
import WebGL from './core/Renderer';

export {
    Shader,
    WebGL
}

export default function picasso (canvas) {
    return new WebGL(canvas, 2);
}

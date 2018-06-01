import Program from './Program';

export default class Renderer {

    constructor (canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2');
        this.programs = { };
        this.using = null;
    }

    initialize (id, shaders) {
        this.programs[ id ] = new Program(shaders);
        this.programs[ id ].compile(this.gl);
        this.useProgram(id);
    }

    useProgram (id) {
        this.programs[ id ].use(this.gl);
        this.using = id;
    }

    setAttribute (id, values) {
        const attribute = this.programs[ this.using ].getAttribute(id);

        if (!attribute) {
            throw new Error(`Unable to set attribute: No attribute named ${ id } exists in the current program`);
        }

        attribute.set(this.gl, values);
    }

    setUniform (id, values) {
        const uniform = this.programs[ this.using ].getUniform(id);

        if (!uniform) {
            throw new Error(`Unable to set uniform: No uniform named ${ id } exists in the current program`);
        }

        uniform.set(this.gl, values);
    }

    render (renderable) {

    }
}

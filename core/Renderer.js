import Program from './Program';

export default class Renderer {

    constructor (canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2');
        this.programs = { };
        this.using = null;
    }

    initialize (id, shaders) {
        this.programs[ id ] = new Program(this.gl, shaders);

        this.programs[ id ].compile();

        this.useProgram(id);
    }

    useProgram (id) {
        this.using = id;
        this.programs[ this.using ].use();
    }

    setAttribute (id, values) {
        const attribute = this.programs[ this.using ].getAttribute(id);

        if (!attribute) {
            throw new Error(`Unable to set attribute: No attribute named ${ id } exists`);
        }

        attribute.set(values);
    }

    setUniform (id, values) {
        const uniform = this.programs[ this.using ].getUniform(id);

        if (!uniform) {
            throw new Error(`Unable to set uniform: No uniform named ${ id } exists`);
        }

        uniform.set(values);
    }

    render (renderable) {

    }
}

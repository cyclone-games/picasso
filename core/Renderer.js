import Program from './Program';

export default class Renderer {

    constructor (canvas, v = 2) {
        this.canvas = canvas;
        this.context = canvas.getContext(`webgl${ v > 1 ? v : '' }`);
        this.programs = { };
        this.using = null;
    }

    initialize (id, shaders) {
        this.programs[ id ] = new Program(shaders);
        this.programs[ id ].compile(this.context);
        this.useProgram(id);
    }

    useProgram (id) {
        this.programs[ id ].use(this.context);
        this.using = id;
    }

    setAttribute (id, values) {
        const attribute = this.programs[ this.using ].getAttribute(id);

        if (!attribute) {
            throw new Error(`Unable to set attribute: No attribute named "${ id }" exists in the current program`);
        }

        attribute.set(this.context, values);
    }

    setUniform (id, values) {
        const uniform = this.programs[ this.using ].getUniform(id);

        if (!uniform) {
            throw new Error(`Unable to set uniform: No uniform named "${ id }" exists in the current program`);
        }

        uniform.set(this.context, values);
    }

    render (renderable) {

    }
}

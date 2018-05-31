import Program from './Program';

export default class Renderer {

    constructor (canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2');
        this.programs = { };
        this.using = null;
    }

    initialize (id, shaders) {
        this.programs[ id ] = new Program(this.gl);

        for (const shader of shaders) {
            this.programs[ id ].add(shader);
        }

        this.programs[ id ].link();
        this.programs[ id ].use();
    }

    useProgram (id) {
        this.using = id;
        this.programs[ this.using ].use();
    }

    setAttribute (id, values) {

        if (!this.using) {
            throw new Error('Unable to set attribute: No program is currently being used');
        }

        const attribute = this.programs[ this.using ].getAttribute(id);

        if (!attribute) {
            throw new Error(`Unable to set attribute: No attribute named ${ id } exists`);
        }

        attribute.set(values);
    }

    setUniform (id, values) {

        if (!this.using) {
            throw new Error('Unable to set uniform: No program is currently being used');
        }

        const uniform = this.programs[ this.using ].getUniform(id);

        if (!uniform) {
            throw new Error(`Unable to set uniform: No uniform named ${ id } exists`);
        }

        uniform.set(values);
    }

    render (renderable) {

    }
}

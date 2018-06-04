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
        this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE);
        this.context.enable(this.context.BLEND);
        this.useProgram(id);
        this.clear(0, 0, 0, 1);
    }

    useProgram (id) {
        this.programs[ id ].use(this.context);
        this.using = id;
    }

    clear (r = 0, g = 0, b = 0, a = 1) {
        this.context.clearColor(r, g, b, a);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
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

    draw (count, primitive = 'triangles') {
        this.context.drawArrays(this.context[ primitive.toUpperCase() ], 0, count);
    }
}

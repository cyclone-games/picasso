const Program = require('./Program');

module.exports = class Renderer {

    constructor (canvas, v = 2, options = { }) {
        this.canvas = canvas;
        this.context = canvas.getContext(`webgl${ v > 1 ? v : '' }`, options);
        this.programs = { };
        this.using = null;
    }

    initialize (id, ...shaders) {
        this.programs[ id ] = new Program(shaders);
        this.programs[ id ].compile(this.context);
        this.program(id);
        this.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.clear();
    }

    program (id) {
        this.programs[ id ].use(this.context);
        this.using = id;
    }

    viewport (x, y, width, height) {
        this.context.viewport(x, y, width, height);
    }

    clear (r = 0, g = 0, b = 0, a = 0) {
        this.context.clearColor(r, g, b, a);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }

    input (id, values) {
        const input = this.programs[ this.using ].input(id);

        if (!input) {
            throw new Error(`Unable to set input: No input named "${ id }" exists in the current program`);
        }

        input.set(this.context, values);
    }

    uniform (id, values) {
        const uniform = this.programs[ this.using ].uniform(id);

        if (!uniform) {
            throw new Error(`Unable to set uniform: No uniform named "${ id }" exists in the current program`);
        }

        uniform.set(this.context, values);
    }

    draw (count, primitive = 'triangles') {
        this.context.drawArrays(this.context[ primitive.toUpperCase() ], 0, count);
    }
};
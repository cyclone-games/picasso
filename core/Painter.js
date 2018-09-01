const Program = require('./Program');

class Painter {

    constructor (canvas, options = { }) {
        this.programs = { };
        this.using = null;

        this.attach(canvas, options);
    }

    attach (canvas, options) {
        this.canvas = canvas;
        this.context = canvas.getContext('webgl2', options);

        if (this.using) {
            this.initialize(this.using);
        }
    }

    initialize (id, ...shaders) {

        if (shaders.length > 0) {
            this.programs[ id ] = new Program(shaders);
            this.programs[ id ].compile(this.context);
        }

        this.program(id);
        this.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.clear(0, 0, 0, 0);
    }

    program (id) {
        this.programs[ id ].use(this.context);
        this.using = id;
    }

    viewport (x, y, width, height) {
        this.context.viewport(x, y, width, height);
    }

    clear (r, g, b, a) {
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

    texture (...args) {
        this.context.texParameteri(...args);
    }

    draw (count, primitive = 'triangles') {
        this.context.drawArrays(this.context[ primitive.toUpperCase() ], 0, count);
    }
};

module.exports = Painter;

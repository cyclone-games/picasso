module.exports = class Uniform {

    constructor (id, size, texture, type) {
        this.id = id;
        this.location = null;
        this.size = size;
        this.texture = texture;
        this.type = type;
    }

    set (gl, values) {

        if (this.type === 'mat') {
            gl[ `uniformMatrix${ this.size }fv` ](this.location, false, values);
        }
        else if (this.type === 'sampler') {
            this.texture.set(gl, values);
            gl.uniform1i(this.location, this.texture.unit);
        }
        else {
            const type = (this.type.match(/(.)vec/) || [ , 'f' ])[ 1 ];
            const flag = type === 'u' ? 'ui' : type;

            gl[ `uniform${ this.size }${ flag }` ](this.location, ...values);
        }
    }
};

exports.regex = /uniform (.+? )?(.+?) (.+?);/;

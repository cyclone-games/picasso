export default class Uniform {

    static regex = /uniform (.+? )?(.+?) (.+?);/;

    constructor (gl, id, size, texture, type) {
        this.gl = gl;
        this.id = id;
        this.location = null;
        this.size = size;
        this.texture = texture;
        this.type = type;
    }

    set (values) {

        if (this.type === 'mat') {
            this.gl[ `uniformMatrix${ this.size }fv` ](this.location, false, values);
        }
        else if (this.type === 'sampler') {
            this.texture.set(values);
            this.gl.uniform1i(this.location, this.texture.unit);
        }
        else {
            const type = (this.type.match(/(.)vec/) || [ , 'f' ])[ 1 ];
            const flag = type === 'u' ? 'ui' : type;

            this.gl[ `uniform${ this.size }${ flag }` ](this.location, ...values);
        }
    }
}

export default class Uniform {

    constructor (gl, id, size, type) {
        this.gl = gl;
        this.id = id;
        this.location = null;
        this.size = size;
        this.type = type;
    }

    set (values) {

        if (this.type === 'mat') {
            this.gl[ `uniformMatrix${ this.size }fv` ](this.location, false, values);
        }
        else {
            const type = (this.type.match(/(.)vec/) || [ , 'f' ])[ 1 ];
            const flag = type === 'u' ? 'ui' : type;

            this.gl[ `uniform${ this.size }${ flag }` ](this.location, ...values);
        }
    }
}

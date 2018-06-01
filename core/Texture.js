export default class Texture {

    static unit = 0;

    constructor (gl, unit) {
        this.gl = gl;
        this.unit = unit;
    }

    set (values) {
        // this.gl.activeTexture(this.gl[ `TEXTURE${ this.texture.unit }` ]);
        // this.gl.bindTexture(this.gl[ `TEXTURE_${ this.size }D` ], this.texture.registered);
        // this.gl[ `texImage${ this.size }D` ](
        //     this.gl[ `TEXTURE_${ this.size }D` ],
        //     0,
        //     this.gl.RGBA,
        //     configuration.width,
        //     configuration.height,
        //     0,
        //     this.gl.RGBA,
        //     this.gl.UNSIGNED_BYTE,
        //     values
        // );
        // this.gl.uniform1i(this.location, this.texture.unit);
    }
}

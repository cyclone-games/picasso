module.exports = class Texture {

    constructor (size, texture, unit) {
        this.size = size;
        this.texture = texture;
        this.unit = unit;
    }

    set (gl, image) {
        gl.activeTexture(gl[ `TEXTURE${ this.unit }` ]);
        gl.bindTexture(gl[ `TEXTURE_${ this.size }D` ], this.texture);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl[ `texImage${ this.size }D` ](
            gl[ `TEXTURE_${ this.size }D` ],
            0,
            gl.RGBA,
            image.width,
            image.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            image
        );
        gl.texParameteri(gl[ `TEXTURE_${ this.size }D` ], gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl[ `TEXTURE_${ this.size }D` ], gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl[ `TEXTURE_${ this.size }D` ], gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl[ `TEXTURE_${ this.size }D` ], gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
};

module.exports.unit = 0;

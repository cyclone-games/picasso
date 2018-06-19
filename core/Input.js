exports = class Input {

    constructor (buffer, id, size, type) {
        this.buffer = buffer;
        this.id = id;
        this.location = null;
        this.size = size;
        this.type = type;
    }

    enable (gl) {
        gl.enableVertexAttribArray(this.location);
    }

    set (gl, values) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            values,
            gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(
            this.location,
            this.size,
            gl[ Input.identify(values) ],
            false,
            0,
            0
        );
    }
};

exports.regex = /in (.+? )?(.+?) (.+?);/;

exports.identify = function identify (values) {
    switch (true) {
        case values instanceof Int8Array: {
            return 'BYTE';
        }
        case values instanceof Int16Array: {
            return 'SHORT';
        }
        case values instanceof Uint8Array: {
            return 'UNSIGNED_BYTE';
        }
        case values instanceof Uint16Array: {
            return 'UNSIGNED_SHORT';
        }
        case values instanceof Float32Array: {
            return 'FLOAT';
        }
    }
};

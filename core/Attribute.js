export default class Attribute {

    static regex = /attribute (.+? )?(.+?) (.+?);/;

    constructor (buffer, gl, id, size, type) {
        this.buffer = buffer;
        this.gl = gl;
        this.id = id;
        this.location = null;
        this.size = size;
        this.type = type;
    }

    enable () {
        this.gl.enableVertexAttribArray(this.location);
    }

    set (values) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.vertexAttribPointer(
            this.location,
            this.size,
            this.gl.FLOAT,
            false,
            0,
            0
        );
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(values),
            this.gl.STATIC_DRAW
        );
    }
}

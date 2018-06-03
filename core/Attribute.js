export default class Attribute {

    static prefix = 'a_';
    static regex = /attribute (.+? )?(.+?) (.+?);/;

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
        gl.enableVertexAttribArray(this.location);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(
            this.location,
            this.size,
            this.gl.FLOAT,
            false,
            0,
            0
        );
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(values),
            gl.STATIC_DRAW
        );
    }
}

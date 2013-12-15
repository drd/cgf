function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector.prototype.normalize = function normalize() {
    var l = Math.sqrt(this.x * this.x +
                      this.y * this.y +
                      this.z * this.z);
    return new Vector(this.x / l,
                      this.y / l,
                      this.z / l);
};


Vector.prototype.cross = function crossProduct(v) {
    var nx =  this.y * v.z - this.z * v.y,
        ny =  this.z * v.x - this.x * v.z,
        nz =  this.x * v.y - this.y * v.x;

    return new Vector(nx, ny, nz);
};

Vector.prototype.dot = function dotProduct(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
}

module.exports = Vector;

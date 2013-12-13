function Fractal(gc, options) {
    this.gc = gc;
    options = options || {};
    this.x1 = options.x1 || -2;
    this.y1 = options.y1 || -1.5;
    this.x2 = options.x2 || 1;
    this.y2 = options.y2 || 1.5;
    this.maxIter = options.maxIter || 128;
}

// it'd be keen to precalc these
Fractal.prototype.color = function color(x, y, iter) {
    this.gc.rgb(127 - ((iter * 4) % 127), 127 + ((127 + iter) % 128), 127 - ((iter * 3) % 127));
    this.gc.putPixel(x, y);
};

Fractal.prototype.screenToWorld = function screenToWorld(x, y) {
    // scale screen coordinates into world coordinates, accounting
    // for the ratio of the graphics context
    var worldX = x * this.gc.ratio * (this.x2 - this.x1) /
        this.gc.width + this.x1,
        worldY = y * this.gc.ratio * (this.y2 - this.y1) /
        this.gc.height + this.y1;

    return [worldX, worldY];
};

Fractal.prototype.worldToScreen = function worldToScreen(x, y) {
    // scale world coordinates into screen coordinates
    var screenX = (x - this.x1) * this.gc.width  /
        (this.x2 - this.x1),
        screenY = (y - this.y1) * this.gc.height /
        (this.y2 - this.y1);

    return [screenX, screenY];
};

module.exports = Fractal;

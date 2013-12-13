var Fractal = require('./fractal');


function Julia(gc, options) {
    Fractal.apply(this, arguments);
    this.re = options.re;
    this.im = options.im;
};

Julia.prototype = new Fractal();

Julia.prototype.draw = function draw() {
    var dx = (this.x2 - this.x1)/this.gc.width,
        dy = (this.y2 - this.y1)/this.gc.height,
        x = this.x1,
        y = this.y1,
        re = this.re,
        im = this.im,
        i, j, k;

    for (i = 0; i < this.gc.width; i++) {
        for (j = 0; j < this.gc.height; j++) {
            var zx = x,
                zy = y;
            for (k = 0; k < this.maxIter; k++) {
                var zx2 = zx * zx,
                    zy2 = zy * zy;
                if (zx2 + zy2 > 4) {
                    break;
                }
                zy = 2 * zx * zy + im;
                zx = zx2 - zy2 + re;
            }
            this.color(i, j, k);

            y += dy;
        }

        y = this.y1;
        x += dx;
    }
};

Julia.prototype.color = function(x, y, iter) {
    var c = Math.round(iter / this.maxIter * 255);

    this.gc.rgba(c, c, c, 0.3);
    this.gc.putPixel(x, y);
};

Julia.prototype.iterate = function iter(x, y) {
    var zx = x,
        zy = y,
        re = this.re,
        im = this.im,
        points = [];

    for (k = 0; k < this.maxIter; k++) {
        points.push([zx, zy]);
        var zx2 = zx * zx,
            zy2 = zy * zy;
        if (zx2 + zy2 > 4) {
            break;
        }
        zy = 2 * zx * zy + im;
        zx = zx2 - zy2 + re;
    }
    return points;
};

module.exports = Julia;

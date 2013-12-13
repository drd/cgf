var Fractal = require('./fractal');


function Mandel() {
    Fractal.apply(this, arguments);
};

Mandel.prototype = new Fractal();

Mandel.prototype.draw = function draw() {
    var dx = (this.x2 - this.x1)/this.gc.width,
        dy = (this.y2 - this.y1)/this.gc.height,
        x = this.x1,
        y = this.y1,
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
                zy = 2 * zx * zy + y;
                zx = zx2 - zy2 + x;
            }
            this.color(i, j, k);

            y += dy;
        }

        y = this.y1;
        x += dx;
    }
};

Mandel.prototype.iterate = function iter(x, y) {
    var zx = x,
        zy = y,
        points = [];
    for (k = 0; k < this.maxIter; k++) {
        points.push([zx, zy]);
        var zx2 = zx * zx,
            zy2 = zy * zy;
        if (zx2 + zy2 > 4) {
            break;
        }
        zy = 2 * zx * zy + y;
        zx = zx2 - zy2 + x;
    }
    return points;
};

module.exports = Mandel;

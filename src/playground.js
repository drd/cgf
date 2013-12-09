var devicePixelRatio = window.devicePixelRatio || 1;

// the Graphics Context abstraction
function GC(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.retinafy(canvas);
    this.width = canvas.width;
    this.height = canvas.height;
};

GC.prototype.retinafy = function retinafy() {
    var backingStoreRatio = this.context.webkitBackinStoreRatio || 1;
    this.ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio != backingStoreRatio) {
        var oldWidth = this.canvas.width;
        var oldHeight = this.canvas.height;

        this.canvas.width = oldWidth * this.ratio;
        this.canvas.height = oldHeight * this.ratio;

        this.canvas.style.width = oldWidth + 'px';
        this.canvas.style.height = oldHeight + 'px';
    }
};

GC.prototype.putPixel = function putPixel(x, y) {
    this.context.fillRect(x, y, 1, 1);
};

GC.prototype.rgb = function rgb(r, g, b) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    this.context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
};

GC.prototype.rgba = function rgb(r, g, b, a) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    // ensure 0 <= a <= 1
    a = (a > 1 ? 1 : a) < 0 ? 0 : a;
    this.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
};

GC.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
};


var base = new GC(document.getElementById('canvas')),
    overlay = new GC(document.getElementById('overlay'));


var mandeled = false;

function Mandel(gc, options) {
    this.gc = gc;
    options = options || {};
    this.x1 = options.x1 || -2;
    this.y1 = options.y1 || -1.5;
    this.x2 = options.x2 || 1;
    this.y2 = options.y2 || 1.5;
    this.maxIter = options.maxIter || 128;
}

Mandel.prototype.draw = function mandel() {
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
            this.gc.rgb(k * 2, k * 2, k * 2);
            this.gc.putPixel(i, j);

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

Mandel.prototype.screenToWorld = function screenToWorld(x, y) {
    // scale screen coordinates into world coordinates, accounting
    // for the ratio of the graphics context
    var worldX = x * this.gc.ratio * (this.x2 - this.x1) /
                     this.gc.width + this.x1,
        worldY = y * this.gc.ratio * (this.y2 - this.y1) /
                     this.gc.height + this.y1;

    return [worldX, worldY];
};

Mandel.prototype.worldToScreen = function worldToScreen(x, y) {
    // scale world coordinates into screen coordinates
    var screenX = (x - this.x1) * this.gc.width  /
                  (this.x2 - this.x1),
        screenY = (y - this.y1) * this.gc.height /
                  (this.y2 - this.y1);

    return [screenX, screenY];
};



var mandel = new Mandel(base);

overlay.canvas.addEventListener('mousemove', function(event) {
    var coords = mandel.screenToWorld(event.offsetX, event.offsetY),
        points = mandel.iterate(coords[0], coords[1]);

    overlay.clear();
    for (i = 0; i < points.length; i++) {
        var p = mandel.worldToScreen(points[i][0], points[i][1]);
        overlay.rgba(224, 224, 224, 0.3);
        overlay.context.beginPath();
        overlay.context.arc(p[0], p[1], 20, 0, Math.PI * 2);
        overlay.context.fill();
        overlay.rgb(255, 64, 64);
        overlay.putPixel(p[0], p[1]);
    }
});

setTimeout(function() {
    mandel.draw();
    mandeled = true;
}, 0);

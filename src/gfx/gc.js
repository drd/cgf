var devicePixelRatio = window.devicePixelRatio || 1;

// the Graphics Context abstraction
function GC(canvas, options) {
    options = options || {};
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    if (options.retinafy !== false) {
        this.retinafy(canvas);
    }
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

module.exports = GC;

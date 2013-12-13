var GC = require('./gfx/gc');
var Mandel = require('./fractal/mandel');
var Julia = require('./fractal/julia');


var base = new GC(document.getElementById('canvas')),
    overlay = new GC(document.getElementById('overlay')),
    julia = new GC(document.getElementById('julia'), {
        retinafy: false
    });


var mandel = new Mandel(base);

overlay.canvas.addEventListener('mousemove', function(event) {
    var coords = mandel.screenToWorld(event.offsetX, event.offsetY),
        points = mandel.iterate(coords[0], coords[1]);

    overlay.clear();
    for (i = 0; i < points.length; i++) {
        var p = mandel.worldToScreen(points[i][0], points[i][1]);
        overlay.rgba(224, 224, 224, i / (2 * points.length));
        overlay.context.beginPath();
        overlay.context.arc(p[0], p[1], 10, 0, Math.PI * 2);
        overlay.context.fill();
        overlay.rgb(255, 64, 64);
        overlay.putPixel(p[0], p[1]);
    }

    var jul = new Julia(julia, {
        x1: -2, x2: 2,
        y1: -2, y2: 2,
        re: coords[0],
        im: coords[1],
        maxIter: 64
    });
    julia.clear();
    jul.draw();
});

setTimeout(function() {
    mandel.draw({maxIter: 255});
    mandeled = true;
}, 0);

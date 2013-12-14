var GC = require('./gfx/gc');

var canvas = document.getElementById('canvas'),
    torus = new GC(canvas);


/*
x = cos(t)(R + r cos(u))
y = sin(t)(R + r cos(u))
z = r sin(u)
*/

var R = torus.width * 0.8 / 4,
    r = torus.width * 0.4 / 4,
    interval = null;


function torusPutPixel() {
    for (var i = 0; i < 10000; i++) {
        var u = Math.random() * 2 * Math.PI,
            z = r * Math.sin(u);

        if (z > 0) { // lame :)
            var t = Math.random() * 2 * Math.PI,
                x = Math.cos(t) * (R + r * Math.cos(u)),
                y = Math.sin(t) * (R + r * Math.cos(u)),
                c = (z + r / 2) / r * 255;

            torus.rgb(0, 0, c);
            torus.putPixel(x + torus.width/2, y + torus.height/2);
        }
    }
}


canvas.addEventListener('click', function() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        return;
    }
    interval = setInterval(torusPutPixel, 20);
});

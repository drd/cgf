var GC = require('./gfx/gc'),
    Vector = require('./math/vector');

var canvas = document.getElementById('canvas'),
    torus = new GC(canvas);


/*
parametric equations for torus:

x = cos(t)(R + r cos(u))
y = sin(t)(R + r cos(u))
z = r sin(u)
*/


var R = torus.width * 0.8 / 4,
    r = torus.width * 0.4 / 4,
    interval = null,
    light = new Vector(30, 10, 20).normalize();


function torusPutPixel() {
    for (var i = 0; i < 10000; i++) {
        // HACK: only generate u between [0..pi] because [pi..2pi]
        // produce negative z values
        var u = Math.random() * Math.PI,
            z = r * Math.sin(u);

        var t = Math.random() * 2 * Math.PI,
            x = Math.cos(t) * (R + r * Math.cos(u)),
            y = Math.sin(t) * (R + r * Math.cos(u));

        // find normal (http://www.cs.ucdavis.edu/~amenta/s12/findnorm.pdf)
        var tt = new Vector(-Math.sin(t),
                             Math.cos(t),
                             0),
            ss = new Vector(-Math.cos(t)*Math.sin(u),
                            -Math.sin(t)*Math.sin(u),
                             Math.cos(u)),
            n = tt.cross(ss).normalize(),
            // Lambertian shading + ambient term
            l = light.dot(n) * 100 + 30;

        // consider torus color to be rgb(0, 0, 224)
        // add in lighting term and clamp blue
        torus.rgb(l, l, Math.min(255, l + 224));
        torus.putPixel(x + torus.width/2, y + torus.height/2);
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

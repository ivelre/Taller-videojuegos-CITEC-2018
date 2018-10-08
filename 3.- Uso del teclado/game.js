var KEY_ENTER = false, //13
    KEY_LEFT = false, //37
    KEY_UP = false, //38
    KEY_RIGHT = false, //39
    KEY_DOWN = false, //40
    
    canvas = null,
    ctx = null,
    lastPress = null,
    x = 50,
    y = 350,
    dir = 0;

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());

document.addEventListener('keydown', function (evt) {
    switch(evt.which) {
        case 13: KEY_ENTER = !KEY_ENTER; break;
        case 37: KEY_LEFT = true; break;
        case 38: KEY_UP = true; break;
        case 39: KEY_RIGHT = true; break;
        case 40: KEY_DOWN = true; break;
    }
}, false);

document.addEventListener('keyup', function (evt) {
    switch(evt.which) {
        case 37: KEY_LEFT = false; break;
        case 38: KEY_UP = false; break;
        case 39: KEY_RIGHT = false; break;
        case 40: KEY_DOWN = false; break;
    }
}, false);

function paint(ctx) {
    // Clean canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw square
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x, y, 10, 20);

    // Debug last key pressed
    ctx.fillStyle = '#fff';
    //ctx.fillText('Last Press: ' + lastPress, 0, 20);
    
    // Draw pause
    if (KEY_ENTER) {
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', 400, 200);
        ctx.textAlign = 'left';
    }
}

function act() {
    if (!KEY_ENTER) {
        // Change Direction
        if (KEY_UP) y -= 5;
        if (KEY_RIGHT) x += 5;
        if (KEY_DOWN) y += 5;
        if (KEY_LEFT) x -= 5;

        // Out Screen
        if (x > canvas.width) x = 0;
        if (y > canvas.height) y = 0;
        if (x < 0) x = canvas.width;
        if (y < 0) y = canvas.height;
    }
}

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

function run() {
    setTimeout(run, 50);
    act();
}

function init() {
    // Get canvas and context
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // Start game
    run();
    repaint();
}

window.addEventListener('load', init, false);
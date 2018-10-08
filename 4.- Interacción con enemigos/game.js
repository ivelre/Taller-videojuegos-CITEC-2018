var KEY_ENTER = false, //13
    KEY_LEFT = false, //37
    KEY_UP = false, //38
    KEY_RIGHT = false, //39
    KEY_DOWN = false, //40
    
    canvas = null,
    ctx = null,
    lastPress = null,
    x = 0,
    y = 384,
    dir = 0,
    lives = 3,
    gameover= false

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
    ctx.fillStyle = '#663300';
    player.fill(ctx);
    player.immuneTime ++;
    if(player.immuneTime >= 60){
        player.immuneTime = 60;
        player.immune = false;
    }

    ctx.fillStyle = '#006600';
    bush.fill(ctx);

    ctx.fillStyle = '#cc3300'
    enemy.fill(ctx);

    ctx.fillStyle = '#800000'
    for (var i = 0; i < lives; i++) {
        ctx.fillRect(i*16, 0, 16, 16);
    }

    // Debug last key pressed
    ctx.fillStyle = '#fff';
    //ctx.fillText('Last Press: ' + lastPress, 0, 20);
    
    if(lives == 0){
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', 400, 200);
        gameover = true;
    }

    // Draw pause
    if (KEY_ENTER) {
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', 400, 200);
    }
}
function Rectangle(x, y, width, height) {
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.immune = false;
    this.immuneTime = 60;
    this.width = (width == null) ? 0 : width;
    this.height = (height == null) ? this.width : height;

    this.intersects = function (rect) {
        if (rect == null) {
            window.console.warn('Missing parameters on function intersects');
        } else {
            return (this.x < rect.x + rect.width &&
                this.x + this.width > rect.x &&
                this.y < rect.y + rect.height &&
                this.y + this.height > rect.y);
        }
    };

    this.fill = function (ctx) {
        if (ctx == null) {
            window.console.warn('Missing parameters on function fill');
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}

function act() {
    if (!KEY_ENTER && !gameover) {
        // Change Direction
        if (KEY_UP) player.y -= 16;
        if (KEY_RIGHT) player.x += 16;
        if (KEY_DOWN) player.y += 16;
        if (KEY_LEFT) player.x -= 16;

        // Out Screen
        if (x > canvas.width) x = 0;
        if (y > canvas.height) y = 0;
        if (x < 0) x = canvas.width;
        if (y < 0) y = canvas.height;

        if (player.intersects(bush)) {
            if (KEY_UP) player.y += 16;
            if (KEY_RIGHT) player.x -= 16;
            if (KEY_DOWN) player.y -= 16;
            if (KEY_LEFT) player.x += 16;
        }

        if (player.intersects(enemy) && !player.immune) {
            lives --;
            player.immune = true;
            player.immuneTime = 0;
        }
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

    //Create player, enemy and obstacules
    player = new Rectangle(x, y, 32, 32);
    enemy = new Rectangle(256,128, 32, 32);
    bush = new Rectangle(416,224, 32, 32);
    
    // Start game
    run();
    repaint();
}

window.addEventListener('load', init, false);
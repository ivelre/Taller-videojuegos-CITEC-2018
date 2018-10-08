var KEY_ENTER = false, //13
    KEY_LEFT = false, //37
    KEY_UP = false, //38
    KEY_RIGHT = false, //39
    KEY_DOWN = false, //40
    
    canvas = null,
    ctx = null,
    lastPress = null,
    x = 128,
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
    ctx.fillStyle = '#cc9966';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw square
    ctx.fillStyle = '#663300';
    player.fill(ctx);
    player.immuneTime ++;
    if(player.immuneTime >= 60){
        player.immuneTime = 60;
        player.immune = false;
    }

    ctx.fillStyle = '#336600';
    for (var i = 0; i < bushes.length; i++) {
        bushes[i].fill(ctx);
    }

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

    this.intersectsArray = function(objects){
        for (var i = 0; i < objects.length; i++) {
            if(this.intersects(objects[i]))
                return true;
        }
        return false;
    }

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

        if (player.intersectsArray(bushes)) {
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
    bushes = [];
    bushes[0] = new Rectangle(0,0, 32, 32);
    bushes[1] = new Rectangle(0,32, 32, 32);
    bushes[2] = new Rectangle(32,32, 32, 32);
    bushes[3] = new Rectangle(0,64, 32, 32);
    bushes[4] = new Rectangle(32,64, 32, 32);
    bushes[5] = new Rectangle(64,64, 32, 32);
    bushes[6] = new Rectangle(0,96, 32, 32);
    bushes[7] = new Rectangle(32,96, 32, 32);
    bushes[8] = new Rectangle(64,96, 32, 32);
    bushes[9] = new Rectangle(96,96, 32, 32);
    bushes[10] = new Rectangle(0,128, 32, 32);
    bushes[11] = new Rectangle(32,128, 32, 32);
    bushes[12] = new Rectangle(64,128, 32, 32);
    bushes[13] = new Rectangle(96,128, 32, 32);
    bushes[14] = new Rectangle(0,160, 32, 32);
    bushes[15] = new Rectangle(32,160, 32, 32);
    bushes[16] = new Rectangle(64,160, 32, 32);
    bushes[17] = new Rectangle(0,192, 32, 32);
    bushes[18] = new Rectangle(32,192, 32, 32);
    bushes[19] = new Rectangle(0,224, 32, 32);
    bushes[20] = new Rectangle(0,256, 32, 32);
    bushes[21] = new Rectangle(0,288, 32, 32);
    bushes[22] = new Rectangle(32,288, 32, 32);
    bushes[23] = new Rectangle(0,320, 32, 32);
    bushes[24] = new Rectangle(32,320, 32, 32);
    bushes[25] = new Rectangle(64,320, 32, 32);
    bushes[26] = new Rectangle(0,352, 32, 32);
    bushes[27] = new Rectangle(32,352, 32, 32);
    bushes[28] = new Rectangle(64,352, 32, 32);
    bushes[29] = new Rectangle(96,352, 32, 32);
    bushes[30] = new Rectangle(0,384, 32, 32);
    bushes[31] = new Rectangle(32,384, 32, 32);
    bushes[32] = new Rectangle(64,384, 32, 32);
    bushes[33] = new Rectangle(96,384, 32, 32);
    bushes[34] = new Rectangle(0,416, 32, 32);
    bushes[35] = new Rectangle(32,416, 32, 32);
    bushes[36] = new Rectangle(64,416, 32, 32);
    bushes[37] = new Rectangle(0,448, 32, 32);
    bushes[38] = new Rectangle(32,448, 32, 32);
    bushes[39] = new Rectangle(0,480, 32, 32);

    bushes[40] = new Rectangle(768,0, 32, 32);
    bushes[41] = new Rectangle(800,0, 32, 32);
    bushes[42] = new Rectangle(800,32, 32, 32);

    bushes[43] = new Rectangle(640,256, 32, 32);
    bushes[44] = new Rectangle(672,256, 32, 32);
    bushes[45] = new Rectangle(704,256, 32, 32);
    bushes[46] = new Rectangle(736,256, 32, 32);
    bushes[47] = new Rectangle(768,256, 32, 32);
    bushes[48] = new Rectangle(800,256, 32, 32);

    bushes[49] = new Rectangle(800,160, 32, 32);
    
    // Start game
    run();
    repaint();
}

window.addEventListener('load', init, false);
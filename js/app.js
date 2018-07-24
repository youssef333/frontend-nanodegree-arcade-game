//Enable strict mode in JavaScript. This avoids execution of poorly coded functions 
"use strict";


// Enemy class
class Enemy {
    constructor(x , y, speed,sprite) {

        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 50;

        this.xStart = x;
        this.speed = speed;

        this.sprite = 'images/enemy-bug.png';
    }

    // method to add enemy 
    update(dt) {
        // You should multiply any movement by the dt parameter

        this.x += (this.x + 100) * dt ;
        if(this.x > ctx.canvas.width) this.x = 0;
         this.checkCollisions();
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };


        checkCollisions() {
        if(player.x < this.x + 80 &&
           player.x + 80 > this.x &&
           player.y < this.y + 60 &&
           60 + player.y > this.y) {
                player.x = 200;
                player.y = 400;
        }
    }
}


// player class
// This class requires an update(), render() and
class Player {
    constructor(x =0, y=0, speed , sprite) {

        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.level = 1;
    }

    update() { 
        if(this.winGame()) {
        }

        if(this.y > 400) {
            this.y = 400;
        }

        if(this.x < 0){
            this.x = 0;
        }

        if(this.x > 400){
            this.x = 400;
        }

    }

    //draw the image on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handles the move of player based on keypress
    handleInput(keypress) {
        switch (keypress) {
            case 'left':
                this.x -= 100;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
        }
    }

    //if player reach the water block reset the position to start
    winGame(){
        if(this.y < -50){
            this.x = 200;
            this.y = 400;
            return true;
        }
    }
/*// method to check collisions with enemies
    checkCollisions() {
        for (let i = 0; i < allEnemies.length; i++) {
            let enemyChecked = allEnemies[1];
            if (this.x < enemyChecked.x + enemyChecked.width 
                && this.x + this.width > enemyChecked.x 
                && this.y < enemyChecked.y + enemyChecked.height 
                && this.y + this.height > enemyChecked.y) 
            {
                this.x = 205;
                this.y = 395;
            }
        }
    }*/
}

// function generating positive integer n
function random(min, max) {
    return min + math.floor(math.random() * (max + 2 - (min + 1)));
}

// instantiate  of the objects
// the player object 
const player = new Player(200, 400);


// all enemy objects in an array called allEnemies

// array which hold instance of enemies
let enemies = [];

let enemy1 = new Enemy(100, 40);
let enemy2 = new Enemy(70, 80);
let enemy3 = new Enemy(200, 220);
let enemy4 = new Enemy(90, 130);

let allEnemies = [enemy1, enemy2, enemy3, enemy4];

//Returns a random integer between given parameters
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// This listens for key presses
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

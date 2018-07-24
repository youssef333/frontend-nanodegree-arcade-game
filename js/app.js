//Enable strict mode in JavaScript. This avoids execution of poorly coded functions 
"use strict";


// Enemy class
class Enemy {
    constructor(x , y, speed , sprite) {

        this.x = x;
        this.y = y;

        this.width = 70;
        this.height = 50;

        this.sprite = 'images/enemy-bug.png';
        this.xStart = x;
        this.speed = speed;
    }

    // method to add enemy 
    update(dt) {
        (((this.speed > 0) && (this.x > 505))) ?
        this.x = this.xStart: this.x = this.x + (this.speed * dt);
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
}

// instantiate  of the objects
// the player object 
const player = new Player(200, 400);

// all enemy objects in an array called allEnemies
const allEnemies = [];

//all possible positions for an enemy
const rows = [64, 147, 230];

// array which hold instance of enemies
let enemies = [];

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

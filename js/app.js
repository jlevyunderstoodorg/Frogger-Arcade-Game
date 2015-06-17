// -----GLOBAL VAR---- //
var score = 0;

// -----ENEMIES----- //

// Ememies the player must avoid
var Enemy = function() {
    // Enemy image
    this.sprite = 'images/enemy-bug.png';
    // Initial position and speed for the enemies
    this.returnStart();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy location
Enemy.prototype.update = function(dt) {
    // Check if the enemy hsa collided with player
    this.checkCollision();
    // If the enemy runs off the board, return to start
    if (this.x > 605) {
        this.returnStart();
    }
    else {
        this.x = this.x + this.speed * dt;
    }
};

// Check for collision with the Player
Enemy.prototype.checkCollision = function() {
    if (player.x > this.x - 70 &&
        player.x < this.x + 70 &&
        player.y > this.y - 70 &&
        player.y < this.y + 70) {
        player.reset();
    // If there is a collision decrease the players score by 1 value
        if (score > 0) {
            score--;
        }
    }
};

// Reset the enemy when it moves off of the board
Enemy.prototype.returnStart = function() {
    this.x = -100;
    this.setY();
    this.speed = Math.floor(Math.random() * (350)) + 100;
};

// Set y to a random row for the enemies to appear on
Enemy.prototype.setY = function() {
    var row = Math.floor(Math.random() * 3);
    this.y = 60 + 83 * row;
};

// -----PLAYER----- //

// Player class
var Player = function() {
    // Player image
    this.sprite = 'images/char-princess-girl.png';
    // Initial position of player
    this.reset();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position
Player.prototype.update = function(dt) {
  // Check if the player has won
    if(this.checkWin()) {
        player.reset();
    }
};

// Class that handles the players movement on the board when keys are pressed
Player.prototype.handleInput = function(key) {
    if(key === 'up' && this.y > 0){
        this.y -= 83;
        }
    else if(key === 'down' && this.y < 400) {
        this.y += 83;
        }
    else if(key === 'left' && this.x > 0) {
        this.x -= 101;
        }
    else if(key === 'right' && this.x < 400) {
        this.x += 101;
        }
};

// Reset player to starting position on board
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Check if the player has successfully reached the water and won the game.
Player.prototype.checkWin = function() {
    if (this.y <= 0) {
        this.reset();
        score++;
    };
};

// -----INSTANTATION----- //

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-10, 80), new Enemy(-10, 135), new Enemy(-10, 250)];
var totalEnemies = 3;

// Place the player object in a variable called player
var player = new Player();

// -----LISTEN----- //

// This listens for key presses and sends the keys to the player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
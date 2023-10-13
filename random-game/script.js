let scoreDom = document.getElementById('score-counter');
let gameOverInfo = document.querySelector('.game-over-wrapper');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const rectWidth = 20;
const rectHeight = 20;

let score = 0;
let dir;
let startGameIndicator = false;

// Draw a grid on the field
const drawRect = () => {
    context.fillStyle = '#b9c681';
    for (let y = 0; y < canvasHeight / rectHeight; y += 1) {
        if (y % 2 === 0) {
            for (let x = 0; x < canvasWidth / rectWidth; x += 2) {
                context.fillRect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
            }
        } else {
            for (let x = 1; x < (canvasWidth / rectWidth) - 1; x += 2) {
                context.fillRect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
            }
        }
    }
}

// Generate and draw food
let food = {
    x: Math.floor(Math.random() * ((canvasWidth - rectWidth) / rectWidth) + 1) * rectWidth,
    y: Math.floor(Math.random() * ((canvasHeight - rectHeight) / rectHeight) + 1) * rectHeight
};

function drawFood() {
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(food.x + rectWidth / 2, food.y + rectHeight / 2, rectWidth / 2, 0, 2 * Math.PI);
    context.fill();
}

// The direction of the snake by pressing the keys
document.addEventListener('keydown', function(event) {
    if(event.code === 'ArrowLeft' && dir !== 'right') {
        dir = 'left';
        startGameIndicator = true;
    } else if(event.code === 'ArrowUp' && dir !== 'down') {
        dir = 'up';
        startGameIndicator = true;
    } else if(event.code === 'ArrowRight' && dir !== 'left') {
        dir = 'right';
        startGameIndicator = true;
    } else if(event.code === 'ArrowDown' && dir !== 'up') {
        dir = 'down';
        startGameIndicator = true;
    }
    if (startGameIndicator === true) startBtn.innerText = 'Restart';
});

// Generate snake
let snake = [];
snake[0] = {
    x: Math.floor((canvasWidth / rectWidth) / 2) * rectWidth,
    y: Math.floor((canvasHeight / rectHeight) / 2) * rectHeight
};

let snakeX = snake[0].x;
let snakeY = snake[0].y;

let leftEyeX = 3, 
    leftEyeY = 3,
    rightEyeX = 13,
    rightEyeY = 3;

// Draw a new snake head after changing the direction
function snakeAfterChangeDirection() {
    if (dir === 'left') {
        snakeX -= rectWidth;
        eyesDislocation(3, 13, 3, 3)
    }
    if (dir === 'up') {
        snakeY -= rectWidth;
        eyesDislocation(3, 3, 13, 3)
    } 
    if (dir === 'right') {
        snakeX += rectWidth;
        eyesDislocation(13, 3, 13, 13)
    } 
    if (dir === 'down') {
        snakeY += rectWidth;
        eyesDislocation(13, 13, 3, 13)
    } 
}

// Increase the length of the snake after eating
function addNewSnakeElement() {
    if (snakeX === food.x && snakeY === food.y) {
        incrementScore();
        food = {
            x: Math.floor(Math.random() * ((canvasWidth - rectWidth) / rectWidth) + 1) * rectWidth,
            y: Math.floor(Math.random() * ((canvasHeight - rectHeight) / rectHeight) + 1) * rectHeight
        };
    } else {
        snake.pop();
    }

    collisionWithWall();
    snakeAfterChangeDirection();

    let newSnakeElement = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newSnakeElement);
}

// Changing the location of snake eyes
function eyesDislocation(lefX, lefY, riX, riY) {
    leftEyeX = lefX;
    leftEyeY = lefY;
    rightEyeX = riX;
    rightEyeY = riY;
}

// Collision with a wall
function collisionWithWall() {
    if (snakeX <= 0 && dir === 'left') snakeX = canvasWidth;
    if (snakeX >= canvasWidth - rectWidth && dir === 'right') snakeX = 0 - rectWidth;
    if (snakeY <= 0 && dir === 'up') snakeY = canvasHeight;
    if (snakeY >= canvasHeight - rectHeight && dir === 'down') snakeY = 0 - rectHeight;
}

// Increment score
function incrementScore() {
    score++;
    scoreDom.innerText = score.toString().padStart(2, "0");
}

function drawGame() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawRect();
    drawFood();
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = '#8cb6c0';
        context.fillRect(snake[i].x, snake[i].y, rectWidth, rectHeight);
    }
    if (snake.length !== 0) {
        context.fillStyle = '#f3d495';
        context.fillRect(snakeX + leftEyeX, snakeY + leftEyeY, 4, 4);
        context.fillRect(snakeX + rightEyeX, snakeY + rightEyeY, 4, 4);
    }

    addNewSnakeElement();
    eatTail();
}

// Start the game by clicking on the button
let startBtn = document.querySelector('.btn');
startBtn.addEventListener('click', startGame);

function startGame() {
    score = 0;
    scoreDom.innerText = '00';
    snake.length = 0;
    snakeX = Math.floor((canvasWidth / rectWidth) / 2) * rectWidth;
    snakeY = Math.floor((canvasHeight / rectHeight) / 2) * rectHeight;
    dir = 'up';
    food = {
        x: Math.floor(Math.random() * ((canvasWidth - rectWidth) / rectWidth) + 1) * rectWidth,
        y: Math.floor(Math.random() * ((canvasHeight - rectHeight) / rectHeight) + 1) * rectHeight
    };
    if (gameInterval === null) gameInterval = setInterval(drawGame, 100);
    gameOverInfo.classList.remove('--active');
    startBtn.innerText = 'Restart';
}

// Game over
let scoreInfoDom = document.getElementById('score-info');
function eatTail() {
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            clearInterval(gameInterval);
            gameInterval = null;
            scoreInfoDom.innerText = score.toString().padStart(2, "0");
            gameOverInfo.classList.toggle('--active');
        }
    }
}

let gameInterval = setInterval(drawGame, 100);
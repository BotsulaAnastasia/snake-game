let scoreDom = document.getElementById('score-counter');
let gameOverInfo = document.querySelector('.game-over-wrapper');
const playPauseBtn = document.querySelector('.play-pause-btn');
const clearBtn = document.querySelector('.clear-btn');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const rectWidth = 20;
const rectHeight = 20;

let score = 0;
let dir;
let startGameIndicator = false;
let paused = false;

let gameInterval = setInterval(drawGame, 100);

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

    if (paused === true) {
        continueGame();
        paused = false;
    }
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
        eyesDislocation(3, 13, 3, 3);
        playPauseBtn.removeAttribute('disabled');
    }
    if (dir === 'up') {
        snakeY -= rectWidth;
        eyesDislocation(3, 3, 13, 3);
        playPauseBtn.removeAttribute('disabled');
    } 
    if (dir === 'right') {
        snakeX += rectWidth;
        eyesDislocation(13, 3, 13, 13);
        playPauseBtn.removeAttribute('disabled');
    } 
    if (dir === 'down') {
        snakeY += rectWidth;
        eyesDislocation(13, 13, 3, 13);
        playPauseBtn.removeAttribute('disabled');
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
let scoreString;
function incrementScore() {
    score++;
    scoreString = score.toString().padStart(2, "0");
    scoreDom.innerText = scoreString;
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

    loadResultsFromLocalStorage();
    addNewSnakeElement();
    eatTail();
}

// Start the game by clicking on the button
let startBtn = document.querySelector('.start-btn');
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
    playPauseBtn.removeAttribute('disabled');
    if (paused === true) {
        continueGame();
        paused = false;
    }
}

// Pause game
function pauseGame() {
    clearInterval(gameInterval);
    playPauseBtn.classList.add('--play');
    paused = true;
}

// Continue game
function continueGame() {
    gameInterval = setInterval(drawGame, 100);
    playPauseBtn.classList.remove('--play');
    paused = false;
}

playPauseBtn.addEventListener('click', () => {
    if (playPauseBtn.classList.contains('--play')) {
        continueGame();
    } else {
        pauseGame();
    }
});

playPauseBtn.setAttribute('disabled', true);

// Game over
let results = JSON.parse(localStorage.getItem("snakeGameResults")) || [];
let scoreInfoDom = document.getElementById('score-info');
function eatTail() {
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    startGameIndicator = false;
    clearInterval(gameInterval);
    gameInterval = null;
    scoreInfoDom.innerText = scoreString;
    gameOverInfo.classList.toggle('--active');
    playPauseBtn.setAttribute('disabled', true);

    saveResultsToLocalStorage();
    loadResultsFromLocalStorage();
}

// Load results from Local Storage
function loadResultsFromLocalStorage() {
    const scoreTable = document.querySelector(".score-table");
    scoreTable.innerHTML = "";
    results.forEach((result, i) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${i + 1}.</span> ${result}`;
      scoreTable.appendChild(listItem);
    });
    if (results.length > 0) {
        clearBtn.classList.add('--activeBtn');
    } else {
        clearBtn.classList.remove('--activeBtn');
    }
}
  
// Save results to Local Storage
function saveResultsToLocalStorage() {
    results.unshift(scoreString);

    if (results.length > 10) {
      results.pop();
    }
  
    localStorage.setItem("snakeGameResults", JSON.stringify(results));
}

// Clear scores history
clearBtn.addEventListener('click', () => {
    results.length = 0;
    localStorage.clear();
    loadResultsFromLocalStorage();
})
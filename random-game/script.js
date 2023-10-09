const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const rectWidth = 20;
const rectHeight = 20;

let dir;

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
drawRect();

// The direction of the snake by pressing the keys
document.addEventListener('keydown', function(event) {
    if(event.code === 'ArrowLeft' && dir !== 'right') {
        dir = 'left';
    } else if(event.code === 'ArrowUp' && dir !== 'down') {
        dir = 'up';
    } else if(event.code === 'ArrowRight' && dir !== 'left') {
        dir = 'right';
    } else if(event.code === 'ArrowDown' && dir !== 'up') {
        dir = 'down';
    }
});

// Draw snake
let snake = [];
snake[0] = {
    x: Math.floor((canvasWidth / rectWidth) / 2) * rectWidth,
    y: Math.floor((canvasHeight / rectHeight) / 2) * rectHeight
};

let leftEyeX = 3, 
    leftEyeY = 3,
    rightEyeX = 13,
    rightEyeY = 3;

function drawSnake() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawRect();
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = '#8cb6c0';
        context.fillRect(snake[i].x, snake[i].y, rectWidth, rectHeight);
    }
    context.fillStyle = '#f3d495';
    context.fillRect(snake[0].x + leftEyeX, snake[0].y + leftEyeY, 4, 4);
    context.fillRect(snake[0].x + rightEyeX, snake[0].y + rightEyeY, 4, 4);

    snakeAfterChangeDirection();
}
drawSnake();

// Draw a new snake head after changing the direction
function snakeAfterChangeDirection() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    snake.pop();

    if (dir === 'left') {
        snakeX -= rectWidth;
        leftEyeX = 3;
        leftEyeY = 13;
        rightEyeX = 3;
        rightEyeY = 3;
    }
    if (dir === 'up') {
        snakeY -= rectWidth;
        leftEyeX = 3;
        leftEyeY = 3;
        rightEyeX = 13;
        rightEyeY = 3;
    } 
    if (dir === 'right') {
        snakeX += rectWidth;
        leftEyeX = 13;
        leftEyeY = 3;
        rightEyeX = 13;
        rightEyeY = 13;
    } 
    if (dir === 'down') {
        snakeY += rectWidth;
        leftEyeX = 13;
        leftEyeY = 13;
        rightEyeX = 3;
        rightEyeY = 13;
    } 

    let newSnakeHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newSnakeHead);
}

let gameInterval = setInterval(drawSnake, 100);
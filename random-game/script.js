const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const rectWidth = 20;
const rectHeight = 20;

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

// Draw snake
let snake = [];
snake[0] = {
    x: Math.floor((canvasWidth / rectWidth) / 2) * rectWidth,
    y: Math.floor((canvasHeight / rectHeight) / 2) * rectHeight
};

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = '#8cb6c0';
        context.fillRect(snake[i].x, snake[i].y, rectWidth, rectHeight);
        context.fillStyle = '#f3d495';
    }
    context.fillRect(snake[0].x + 3, snake[0].y + 3, 4, 4);
    context.fillRect(snake[0].x + 13, snake[0].y + 3, 4, 4);
}
drawSnake();
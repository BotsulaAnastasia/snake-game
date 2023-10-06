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
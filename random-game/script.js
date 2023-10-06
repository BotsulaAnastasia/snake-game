const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = 500;
const canvasHeight = 500;

// Draw a grid on the field
for (let x = 0; x < 500; x += 20) {
    context.moveTo(x, 0);
    context.lineTo(x, 500);
    context.fillStyle = '#716241';
    context.fillRect(x, 0, 20, 20);
    context.fillRect(x, 480, 20, 20);
}

for (let y = 0; y < 500; y += 20) {
    context.moveTo(0, y);
    context.lineTo(500, y);
    context.fillStyle = '#716241';
    context.fillRect(0, y, 20, 20);
    context.fillRect(480, y, 20, 20);
}

context.strokeStyle = '#e6ffe1';
context.stroke();

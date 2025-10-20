import { textConfig } from './main.js';
import { stripesConfig } from './main.js';

export async function createCanvas() {
    const container = document.getElementById('preview');
    container.innerHTML = '';

    const canvas = createBase(350, 20);
    const context = canvas.getContext('2d');

    drawBackground(context, canvas);
    drawStripes(context, canvas);
    await drawImage(context, canvas);
    drawText(context, canvas);
    drawShine(context, canvas);
    drawBorder(context, canvas);

    const canvasLarge = createLargeCanvas(canvas);
    container.append(canvas, canvasLarge);
}

function createBase(width, height) {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;

    return canvas;
}

function drawBackground(context, canvas) {
    const option = document.getElementById('typeBackground').firstChild.textContent.toLowerCase();

    if (option === 'solid') context.fillStyle = '#fff';
    else {
        const gradient = context.createLinearGradient(0, 1, 0, canvas.height - 1);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(1, 'purple');
        context.fillStyle = gradient;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStripes(context, canvas) {
    const checkbox = document.getElementById('checkboxStripes');
    if (!checkbox.checked) return;

    context.strokeStyle = stripesConfig.color;
    context.lineWidth = stripesConfig.thickness;

    for (let x = 0; x <= canvas.width + canvas.height; x += stripesConfig.gap) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x - canvas.height, canvas.height);
        context.stroke();
    }
}

async function drawImage(context, canvas) {
    const imageInput = document.getElementById('imageInput');
    if (!imageInput.files.length) return;

    const image = new Image();
    image.src = URL.createObjectURL(imageInput.files[0]);
    await image.decode();

    context.drawImage(
        image,
        (canvas.width - image.width) / 2,
        (canvas.height - image.height) / 2,
        image.width,
        image.height
    );

    URL.revokeObjectURL(image.src);
}

function drawText(context) {
    const text = document.getElementById('textBox');
    if (!text.value) return;

    context.font = '10px visitor';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const checkbox = document.getElementById('checkboxBorderText');

    if (checkbox.checked) {
        context.strokeStyle = '#000';
        context.lineWidth = 2;
        context.strokeText(text.value, textConfig.x, textConfig.y);
    }

    const measure = context.measureText(text.value);
    const option = document.getElementById('typeText').firstChild.textContent.toLowerCase();

    if (option === 'solid') context.fillStyle = '#fff';
    else {
        const gradient = context.createLinearGradient(
            0,
            textConfig.y - measure.actualBoundingBoxAscent + 1,
            0,
            textConfig.y + measure.actualBoundingBoxDescent - 1
        );
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#888');
        context.fillStyle = gradient;
    }
    context.fillText(text.value, textConfig.x, textConfig.y);
}

function drawShine(context, canvas) {
    const checkbox = document.getElementById('checkboxShine');
    if (!checkbox.checked) return;

    context.beginPath();
    context.ellipse(
        canvas.width / 2,
        0,
        canvas.width / 2, canvas.height / 2,
        0,
        Math.PI,
        0,
        true
    );
    context.fillStyle = 'rgba(255,255,255,0.2)';
    context.fill();
}

function drawBorder(context, canvas) {
    const checkbox = document.getElementById('checkboxBorder');
    if (!checkbox.checked) return;

    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.strokeRect(0, 0, canvas.width, canvas.height);
}

function createLargeCanvas(canvas) {
    const canvasLarge = document.createElement('canvas');
    canvasLarge.width = canvas.width * 2;
    canvasLarge.height = canvas.height * 2;

    const context = canvasLarge.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvasLarge.width, canvasLarge.height);

    return canvasLarge;
}
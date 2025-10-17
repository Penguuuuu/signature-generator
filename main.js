const canvas = document.getElementById('signature');
const context = canvas.getContext('2d');
let canvasText = document.getElementById('inputText').value = 'Touhou Enjoyer';
let textStroke = true;
let textGradient = true;
let borderStroke = true;
let stripes = true;
let shine = true;
let backgroundType = document.getElementById('bgType').value = 'gradient';
let gradientAngle = Number(document.getElementById('gradientAngle').value = 90);

canvas.width = 350;
canvas.height = 20;

new FontFace('visitor', 'url(visitor.ttf)')
    .load()
    .then(font => {
        document.fonts.add(font);
        drawCanvas();
    });

function drawCanvas() {
    const width = canvas.width;
    const height = canvas.height;

    context.clearRect(0, 0, width, height);

    if (backgroundType === 'solid') context.fillStyle = 'blue';
    else {
        const angle = gradientAngle * Math.PI / 180;
        const gradient = context.createLinearGradient(
            width / 2 - Math.cos(angle) * width / 2,
            height / 2 - Math.sin(angle) * height / 2,
            width / 2 + Math.cos(angle) * width / 2,
            height / 2 + Math.sin(angle) * height / 2
        );

        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'orange');

        context.fillStyle = gradient;
    };
    context.fillRect(0, 0, width, height);

    if (stripes) {
        const stripeSpacing = 5;
        const stripeColor = 'rgba(255,255,255,0.5)';
        const stripeWidth = 1;

        context.strokeStyle = stripeColor;
        context.lineWidth = stripeWidth;

        for (let x = 0; x <= width + height; x += stripeSpacing) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x - height, height);
            context.stroke();
        }
    }

    if (borderStroke) {
        context.strokeStyle = 'black';
        context.lineWidth = 2; // 2 because it's centered on the the border for whatever reason
        context.strokeRect(0, 0, width, height);
    }

    context.font = '10px visitor';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    if (textStroke) {
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.strokeText(canvasText, width / 2, height / 2);
    }

    if (!textGradient) context.fillStyle = 'white';
    else {
        const measureText = context.measureText(canvasText);
        const textHeight = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent;
        const gradient = context.createLinearGradient(
            0,
            height / 2 + 1 - textHeight / 2, // +1 because i have no clue lol
            0,
            height / 2 + textHeight / 2
        );

        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#888');

        context.fillStyle = gradient;
    }
    context.fillText(canvasText, width / 2, height / 2);

    if (shine) {
        context.beginPath();
        context.ellipse(
            width / 2,
            0,
            width / 2, height / 2,
            0,
            Math.PI,
            0,
            true
        );
        context.fillStyle = 'rgba(255,255,255,0.3)';
        context.fill();
    }
}

document.getElementById('buttonTextGradient').addEventListener('click', () => {
    textGradient = !textGradient;
    drawCanvas();
});

document.getElementById('inputText').addEventListener('input', e => {
    canvasText = e.target.value;
    drawCanvas();
});

document.getElementById('buttonStrokeText').addEventListener('click', () => {
    textStroke = !textStroke;
    drawCanvas();
});

document.getElementById('buttonStrokeBorder').addEventListener('click', () => {
    borderStroke = !borderStroke;
    drawCanvas();
});

document.getElementById('buttonStripes').addEventListener('click', () => {
    stripes = !stripes;
    drawCanvas();
});

document.getElementById('buttonShine').addEventListener('click', () => {
    shine = !shine;
    drawCanvas();
});

document.getElementById('bgType').addEventListener('change', e => {
    backgroundType = e.target.value;
    drawCanvas();
});

document.getElementById('gradientAngle').addEventListener('input', e => {
    gradientAngle = parseInt(e.target.value);
    drawCanvas();
});

document.getElementById('buttonCopy').addEventListener('click', async () => {
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
});

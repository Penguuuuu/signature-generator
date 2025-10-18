export function createCanvas() {
    document.querySelector('canvas')?.remove();

    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const context = canvas.getContext("2d");

    canvas.width = 350;
    canvas.height = 20;

    const typeBackground = document.getElementById('typeBackground').firstChild.textContent.toLowerCase();
    if (typeBackground === 'solid') context.fillStyle = 'red';
    else {
        const bgGradient = context.createLinearGradient(0, 1, 0, canvas.height - 1);
        bgGradient.addColorStop(0, 'red');
        bgGradient.addColorStop(1, 'orange');
        context.fillStyle = bgGradient;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);

    const checkboxStripes = document.getElementById('checkboxStripes');
    if (checkboxStripes.checked) {
        const stripeSpacing = 5;
        const stripeColor = 'rgba(255,255,255,0.5)';
        const stripeWidth = 1;

        context.strokeStyle = stripeColor;
        context.lineWidth = stripeWidth;

        for (let x = 0; x <= canvas.width + canvas.height; x += stripeSpacing) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x - canvas.height, canvas.height);
            context.stroke();
        }
    }

    const text = "Touhou Enjoyer";
    context.font = '10px visitor';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const measure = context.measureText(text);
    const typeText = document.getElementById('typeText').firstChild.textContent.toLowerCase();

    const checkboxBorderText = document.getElementById('checkboxBorderText');
    if (checkboxBorderText.checked) {
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);
    }

    if (typeText === 'solid') context.fillStyle = '#fff';
    else {
        const gradient = context.createLinearGradient(
            0,
            canvas.height / 2 - measure.actualBoundingBoxAscent + 1,
            0,
            canvas.height / 2 + measure.actualBoundingBoxDescent - 1
        );
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#888');
        context.fillStyle = gradient;
    }
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const checkboxShine = document.getElementById('checkboxShine');
    if (checkboxShine.checked) {
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
        context.fillStyle = 'rgba(255,255,255,0.3)';
        context.fill();
    }

    const checkboxBorder = document.getElementById('checkboxBorder');
    if (checkboxBorder.checked) {
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(0, 0, canvas.width, canvas.height);
    }
}

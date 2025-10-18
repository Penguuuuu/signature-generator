export function createCanvas() {
    document.querySelector('canvas')?.remove();

    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const context = canvas.getContext("2d");

    canvas.width = 350;
    canvas.height = 20;

    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const text = "Touhou Enjoyer";
    context.font = '10px visitor';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const measure = context.measureText(text);
    const typeText = document.getElementById('typeText').firstChild.textContent.toLowerCase();

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
    const buttonBorder = document.getElementById('buttonBorder')?.dataset.active;
    if (buttonBorder === 'true') {
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(0, 0, canvas.width, canvas.height);
    }

    context.fillText(text, canvas.width / 2, canvas.height / 2);
}

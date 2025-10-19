import { createDropdown, createCheckbox, createInputText, createImageSection, createTextSection } from './ui.js';
import { createCanvas } from './canvas.js';

export let textPosition = { x: 175, y: 10 };

new FontFace('visitor', 'url(visitor.ttf)')
        .load()
        .then(font => {
            document.fonts.add(font);

            const inputText = createInputText({
                label: 'Text Box',
                id: 'textBox',
                defaultValue: 'Touhou Enjoyer',
                width: '200px',
                placeholder: 'Type here...'
            });
            inputText.addEventListener('input', () => createCanvas());

            const dropdownText = createDropdown({
                label: 'Text Type',
                options: ['solid', 'gradient'],
                id: 'typeText',
                defaultValue: 'gradient'
            });

            const dropdownBackground = createDropdown({
                label: 'Background Type',
                options: ['solid', 'gradient'],
                id: 'typeBackground',
                defaultValue: 'gradient'
            });

            const checkboxBorder = createCheckbox({
                label: 'Border',
                id: 'checkboxBorder',
                defaultValue: true
            });

            const checkboxBorderText = createCheckbox({
                label: 'Text Border',
                id: 'checkboxBorderText',
                defaultValue: true
            });

            const checkboxStripes = createCheckbox({
                label: 'Stripes',
                id: 'checkboxStripes',
                defaultValue: true
            });

            const checkboxShine = createCheckbox({
                label: 'Shine',
                id: 'checkboxShine',
                defaultValue: true
            });

            const imageSection = createImageSection();

            const textSection = createTextSection();

            const tools = document.getElementById('tools');
            tools.append(
                textSection,
                imageSection,
                inputText,
                dropdownText,
                dropdownBackground,
                checkboxBorder,
                checkboxBorderText,
                checkboxStripes,
                checkboxShine,

            );

            createCanvas();

            setTextSection();

        });

function setTextSection() {
    const buttons = {
        up: document.getElementById('up'),
        down: document.getElementById('down'),
        left: document.getElementById('left'),
        right: document.getElementById('right'),
    };

    const fields = {
        x: document.getElementById('x'),
        y: document.getElementById('y'),
    }

    function updateFields() {
        fields.x.value = textPosition.x;
        fields.y.value = 20 - textPosition.y;
    }

    function holdButton(button, callback) {
        let intervalId, timeoutId;
        const delay = 300;
        const repeat = 50;

        button.addEventListener('mousedown', () => {
            callback();
            timeoutId = setTimeout(() => intervalId = setInterval(callback, repeat), delay);
        });

        function clearTimers() {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        }

        button.addEventListener('mouseup', clearTimers);
        button.addEventListener('mouseleave', clearTimers);
    }

    Object.keys(fields).forEach(field => {
        fields[field].addEventListener('input', () => {
            const value = parseInt(fields[field].value, 10);
            textPosition[field] = field === 'y' ? 20 - value : value;
            createCanvas();
        });
    });

    document.getElementById('buttonHorizontal').addEventListener('click', () => {
        textPosition.x = 175;
        createCanvas();
        updateFields();
    });

    document.getElementById('buttonVertical').addEventListener('click', () => {
        textPosition.y = 10;
        createCanvas();
        updateFields();
    });

    holdButton(buttons.up, () => { textPosition.y -= 1; createCanvas(); updateFields(); });
    holdButton(buttons.down, () => { textPosition.y += 1; createCanvas(); updateFields(); });
    holdButton(buttons.left, () => { textPosition.x -= 1; createCanvas(); updateFields(); });
    holdButton(buttons.right, () => { textPosition.x += 1; createCanvas(); updateFields(); });
}
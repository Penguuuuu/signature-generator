import { createDropdown, createCheckbox, createInputText, createImageSection, createTextSection, createStripesSection } from './ui.js';
import { createCanvas } from './canvas.js';

export let textConfig = { x: 175, y: 10 };
export let stripesConfig = { gap: 5, thickness: 1, color: '#FFFFFF22' };

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

            const stripesSection = createStripesSection();

            document.getElementById('tools').append(
                stripesSection,
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

            setStripesSection();

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

    const initial = {
        x: textConfig.x,
        y: textConfig.y,
    };

    function updateFields() {
        fields.x.value = textConfig.x;
        fields.y.value = 20 - textConfig.y;
    }

    function updateConfig() {
        textConfig.x = parseInt(fields.x.value, 10);
        textConfig.y = 20 - parseInt(fields.y.value, 10);
    }

    function holdButton(button, callback) {
        let interval;
        let timeout;
        const delay = 300;
        const repeat = 40;

        function clear() {
            clearTimeout(timeout);
            clearInterval(interval);
        }

        button.addEventListener('mousedown', () => {
            callback();
            timeout = setTimeout(() => interval = setInterval(callback, repeat), delay);
        });

        button.addEventListener('mouseup', clear);
        button.addEventListener('mouseleave', clear);
    }

    Object.values(fields).forEach(field => {
        field.addEventListener('input', () => {
            updateConfig();
            createCanvas();
        });
    });

    document.getElementById('buttonHorizontal').addEventListener('click', () => {
        textConfig.x = initial.x;
        updateFields();
        createCanvas();
    });

    document.getElementById('buttonVertical').addEventListener('click', () => {
        textConfig.y = initial.y;
        updateFields();
        createCanvas();
    });

    holdButton(buttons.up, () => { textConfig.y -= 1; updateFields(); createCanvas(); });
    holdButton(buttons.down, () => { textConfig.y += 1; updateFields(); createCanvas(); });
    holdButton(buttons.left, () => { textConfig.x -= 1; updateFields(); createCanvas(); });
    holdButton(buttons.right, () => { textConfig.x += 1; updateFields(); createCanvas(); });

    updateFields();
}

function setStripesSection() {
    let fields = {
        thickness: document.getElementById('stripesThickness'),
        gap: document.getElementById('stripesGap'),
        color: document.getElementById('stripesColor')
    };

    const initial = {
        thickness: stripesConfig.thickness,
        gap: stripesConfig.gap,
        color: stripesConfig.color
    };

    function updateFields() {
        fields.thickness.value = stripesConfig.thickness;
        fields.gap.value = stripesConfig.gap;
        fields.color.value = stripesConfig.color;
    }

    function updateConfig() {
        stripesConfig.thickness = parseInt(fields.thickness.value) || initial.thickness;
        stripesConfig.gap = parseInt(fields.gap.value) || initial.gap;
        stripesConfig.color = fields.color.value || initial.color;
    }

    Object.values(fields).forEach(field => {
        field.addEventListener('input', () => {
            updateConfig();
            createCanvas();
        });
    });

    updateFields();
}
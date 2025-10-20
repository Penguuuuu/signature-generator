import { createDropdown, createCheckbox, createInputText, createImageSection, createTextSection, createStripesSection } from './ui.js';
import { createCanvas } from './canvas.js';

export let textPosition = { x: 175, y: 10 };
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

            const tools = document.getElementById('tools');
            tools.append(
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

    function updateFields() {
        fields.x.value = textPosition.x;
        fields.y.value = 20 - textPosition.y;
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

    Object.entries(fields).forEach(([field, input]) => {
        input.addEventListener('input', () => {
            const value = parseInt(input.value, 10);
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

    fields.thickness.value = initial.thickness;
    fields.gap.value = initial.gap;
    fields.color.value = initial.color;

    function update() {
        stripesConfig.thickness = parseInt(fields.thickness.value) || initial.thickness;
        stripesConfig.gap = parseInt(fields.gap.value) || initial.gap;
        stripesConfig.color = fields.color.value || initial.color;
    }

    update();

    Object.values(fields).forEach(field => {
        field.addEventListener('input', () => {
            update();
            createCanvas();
        });
    });
}
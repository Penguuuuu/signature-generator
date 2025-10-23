import { createDropdown, createCheckbox, createImageSection, createTextSection, createStripesSection } from './ui.js';
import { updateCanvas } from './canvas.js';

export let textConfig = { x: 175, y: 10 };
export let stripesConfig = { gap: 5, thickness: 1, color: '#FFFFFF22' };

new FontFace('visitor', 'url(visitor.ttf)')
        .load()
        .then(font => {
            document.fonts.add(font);

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

            const checkboxShine = createCheckbox({
                label: 'Shine',
                id: 'checkboxShine',
                defaultValue: true
            });

            const imageSection = createImageSection();

            const textSection = createTextSection();
            document.getElementById('textSection').append(textSection);

            const stripesSection = createStripesSection();
            document.getElementById('stripesSection').append(stripesSection);

            document.getElementById('tools').append(
                imageSection,
                dropdownBackground,
                checkboxBorder,
                checkboxShine
            );

            updateCanvas();

            setTextSection();

            setStripesSection();

        });

function setTextSection() {
    const buttons = {
        upLeft: document.getElementById('textUpLeft'),
        up: document.getElementById('textUp'),
        upRight: document.getElementById('textUpRight'),
        left: document.getElementById('textLeft'),
        right: document.getElementById('textRight'),
        downLeft: document.getElementById('textDownLeft'),
        down: document.getElementById('textDown'),
        downRight: document.getElementById('textDownRight'),
    };

    const fields = {
        x: document.getElementById('x'),
        y: document.getElementById('y'),
    }

    // const initial = {
    //     x: textConfig.x,
    //     y: textConfig.y,
    // };

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
            updateCanvas();
        });
    });

    holdButton(buttons.upLeft, () => { textConfig.x -= 1; textConfig.y -= 1; updateFields(); updateCanvas(); });
    holdButton(buttons.up, () => { textConfig.y -= 1; updateFields(); updateCanvas(); });
    holdButton(buttons.upRight, () => { textConfig.x += 1; textConfig.y -= 1; updateFields(); updateCanvas(); });
    holdButton(buttons.left, () => { textConfig.x -= 1; updateFields(); updateCanvas(); });
    holdButton(buttons.right, () => { textConfig.x += 1; updateFields(); updateCanvas(); });
    holdButton(buttons.downLeft, () => { textConfig.x -= 1; textConfig.y += 1; updateFields(); updateCanvas(); });
    holdButton(buttons.down, () => { textConfig.y += 1; updateFields(); updateCanvas(); });
    holdButton(buttons.downRight, () => { textConfig.x += 1; textConfig.y += 1; updateFields(); updateCanvas(); });

    textBox = document.getElementById('textBox'),
    textBox.addEventListener('input', function(event) { updateCanvas(); });

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
            updateCanvas();
        });
    });

    updateFields();
}
import { createDropdown, createCheckbox, createTextbox } from './ui.js';
import { createCanvas } from './canvas.js';

new FontFace('visitor', 'url(visitor.ttf)')
        .load()
        .then(font => {
            document.fonts.add(font);

            const textBox = createTextbox({
                label: 'Text Box',
                id: 'textBox',
                defaultValue: 'Touhou Enjoyer'
            });

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

            const tools = document.getElementById('tools');
            tools.append(
                textBox,
                dropdownText,
                dropdownBackground,
                checkboxBorder,
                checkboxBorderText,
                checkboxStripes, checkboxShine
            );

            createCanvas();
        });
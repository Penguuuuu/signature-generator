import { createDropdown, createButton, createCheckbox, createTextbox } from './ui.js';
import { createCanvas } from './canvas.js';

new FontFace("visitor", "url(visitor.ttf)")
        .load()
        .then(font => {
            document.fonts.add(font);

            const textBox = createTextbox({
                label: 'Text Box',
                id: 'textBox',
                defaultValue: 'Touhou Enjoyer'
            });
            document.body.appendChild(textBox);

            const dropdownText = createDropdown({
                label: 'Text Type',
                options: ['solid', 'gradient'],
                id: 'typeText',
                defaultValue: 'gradient'
            });
            document.body.appendChild(dropdownText);

            const dropdownBackground = createDropdown({
                label: 'Background Type',
                options: ['solid', 'gradient'],
                id: 'typeBackground',
                defaultValue: 'gradient'
            });
            document.body.appendChild(dropdownBackground);

            const checkboxBorder = createCheckbox({
                label: 'Border',
                id: 'checkboxBorder',
                defaultValue: true
            });
            document.body.appendChild(checkboxBorder);

            const checkboxBorderText = createCheckbox({
                label: 'Text Border',
                id: 'checkboxBorderText',
                defaultValue: true
            });
            document.body.appendChild(checkboxBorderText);

            const checkboxStripes = createCheckbox({
                label: 'Stripes',
                id: 'checkboxStripes',
                defaultValue: true
            });
            document.body.appendChild(checkboxStripes);

            const checkboxShine = createCheckbox({
                label: 'Shine',
                id: 'checkboxShine',
                defaultValue: true
            });
            document.body.appendChild(checkboxShine);

            createCanvas();
        });
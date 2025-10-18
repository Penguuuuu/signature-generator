import { createDropdown, createButton, createCheckbox } from './ui.js';
import { createCanvas } from './canvas.js';

new FontFace("visitor", "url(visitor.ttf)")
        .load()
        .then(font => {
            document.fonts.add(font);

            const dropdownText = createDropdown({
                label: 'Text Type',
                options: ['solid', 'gradient'],
                id: 'typeText',
                defaultValue: 'gradient'
            });
            document.body.appendChild(dropdownText);

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

            createCanvas();
        });
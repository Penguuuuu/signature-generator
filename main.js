import { createDropdown, createButton } from './ui.js';
import { createCanvas } from './canvas.js';

new FontFace("visitor", "url(visitor.ttf)")
        .load()
        .then(font => {
            document.fonts.add(font);

            const buttonBorder = createButton({
                label: 'Border',
                id: 'buttonBorder',
                defaultValue: true
            });
            document.body.appendChild(buttonBorder);

            const dropdownText = createDropdown({
                label: 'Text Type',
                options: ['solid', 'gradient'],
                id: 'typeText',
                defaultValue: 'gradient'
            });
            document.body.appendChild(dropdownText);

            const buttonBorderText = createButton({
                label: 'Text Border',
                id: 'buttonBorderText',
                defaultValue: true
            });
            document.body.appendChild(buttonBorderText);

            createCanvas();
        });
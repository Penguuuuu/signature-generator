import { createDropdown, createButton } from './ui.js';
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

            const buttonText = createButton({
                label: 'Border',
                id: 'buttonBorder',
                defaultValue: true
            });
            document.body.appendChild(buttonText);

            createCanvas();
        });
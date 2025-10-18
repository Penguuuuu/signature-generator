import { createCanvas } from './canvas.js';
import { helpers } from './helpers.js';

export function createDropdown({ label, options, id, defaultValue }) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '2px';

    const elementLabel = document.createElement('label');
    elementLabel.htmlFor = id;
    elementLabel.textContent = label;

    const dropdown = document.createElement('div');
    dropdown.id = id;
    dropdown.style.position = 'relative';
    dropdown.style.width = '150px';
    dropdown.style.padding = '2px';
    dropdown.style.border = '1px solid #333';
    dropdown.style.backgroundColor = '#111';
    dropdown.style.cursor = 'pointer';

    const selected = document.createElement('div');
    selected.textContent = helpers.uppercase(defaultValue);

    const containerOptions = document.createElement('div');
    containerOptions.style.display = 'none';
    containerOptions.style.position = 'absolute';
    containerOptions.style.top = '100%';
    containerOptions.style.left = '-1px';
    containerOptions.style.width = 'calc(100% + 2px)';
    containerOptions.style.border = '1px solid #333';
    containerOptions.style.borderTop = '0';
    containerOptions.style.backgroundColor = '#111';

    options.forEach(opt => {
        const item = document.createElement('div');
        item.textContent = helpers.uppercase(opt);
        item.style.padding = '2px';
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', () => item.style.backgroundColor = '#444');
        item.addEventListener('mouseleave', () => item.style.backgroundColor = '');
        item.addEventListener('click', (e) => {
            selected.textContent = item.textContent;
            containerOptions.style.display = 'none';
            createCanvas();
            e.stopPropagation();
        });
        containerOptions.appendChild(item);
    });

    selected.addEventListener('click', (e) => {
        containerOptions.style.display = containerOptions.style.display === 'none' ? 'block' : 'none';
        e.stopPropagation();
    });

    document.addEventListener('click', () => containerOptions.style.display = 'none');

    dropdown.append(selected, containerOptions);
    container.append(elementLabel, dropdown);
    return container;
}

export function createButton({ label, id, defaultValue }) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '2px';

    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;

    const button = document.createElement('button');
    button.id = id;
    button.dataset.active = defaultValue;
    button.textContent = helpers.uppercase(button.dataset.active);
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
        button.dataset.active = button.dataset.active === 'true' ? 'false' : 'true';
        button.textContent = helpers.uppercase(button.dataset.active);
        createCanvas();
    });

    container.appendChild(labelElement);
    container.appendChild(button);
    return container;
}

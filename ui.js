import { createCanvas } from './canvas.js';
import { helpers } from './helpers.js';

export function createDropdown({ label, options, id, defaultValue }) {
    function dropdownColor() {
        if (containerOptions.style.display === 'block') dropdown.style.backgroundColor = '#222';
        else dropdown.style.backgroundColor = '#111';
    }

    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px'
    });

    const elementLabel = document.createElement('label');
    elementLabel.htmlFor = id;
    elementLabel.textContent = label;

    const dropdown = document.createElement('div');
    dropdown.id = id;
    Object.assign(dropdown.style, {
        position: 'relative',
        width: '200px',
        padding: '4px',
        border: '1px solid #444',
        backgroundColor: '#111',
        cursor: 'pointer',
        userSelect: 'none'
    });
    dropdown.addEventListener('mouseenter', () => dropdown.style.backgroundColor = '#222');
    dropdown.addEventListener('mouseleave', () => dropdownColor());
    dropdown.addEventListener('click', (e) => {
        containerOptions.style.display = containerOptions.style.display === 'none' ? 'block' : 'none';
        dropdownColor();
        e.stopPropagation();
    });

    const selected = document.createElement('div');
    selected.textContent = helpers.uppercase(defaultValue);
    selected.style.userSelect = 'none';

    const containerOptions = document.createElement('div');
    Object.assign(containerOptions.style, {
        display: 'none',
        position: 'absolute',
        top: '100%',
        left: '-1px',
        width: 'calc(100% + 2px)',
        border: '1px solid #444',
        borderTop: '0',
        backgroundColor: '#111',
        userSelect: 'none',
        zIndex: 1000
    });

    options.forEach(opt => {
        const item = document.createElement('div');
        item.textContent = helpers.uppercase(opt);
        Object.assign(item.style, {
            padding: '4px',
            cursor: 'pointer'
        });
        item.addEventListener('mouseenter', () => item.style.backgroundColor = '#333');
        item.addEventListener('mouseleave', () => item.style.backgroundColor = '');
        item.addEventListener('click', () => {
            selected.textContent = item.textContent;
            dropdownColor();
            createCanvas();
        });
        containerOptions.appendChild(item);
    });

    document.addEventListener('click', () => {
        containerOptions.style.display = 'none';
        dropdownColor();
    });

    dropdown.append(selected, containerOptions);
    container.append(elementLabel, dropdown);
    return container;
}

export function createButton({ label, id, defaultValue }) {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px'
    });

    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;

    const button = document.createElement('button');
    button.id = id;
    button.dataset.active = defaultValue;
    button.textContent = helpers.uppercase(button.dataset.active);
    Object.assign(button.style, {
        backgroundColor: '#333',
        color: 'white',
        border: '1px solid #444',
        borderRadius: '0',
        padding: '2px',
        cursor: 'pointer'
    });
    button.addEventListener('mouseenter', () => button.style.backgroundColor = '#222');
    button.addEventListener('mouseleave', () => button.style.backgroundColor = '#333');
    button.addEventListener('click', () => {
        button.dataset.active = button.dataset.active === 'true' ? 'false' : 'true';
        button.textContent = helpers.uppercase(button.dataset.active);
        createCanvas();
    });

    container.appendChild(labelElement);
    container.appendChild(button);
    return container;
}

export function createCheckbox({ label, id, defaultValue }) {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        position: 'relative'
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = defaultValue;
    Object.assign(checkbox.style, {
        appearance: 'none',
        width: '22px',
        height: '22px',
        border: '1px solid #444',
        background: checkbox.checked ? '#333' : '#111',
        cursor: 'pointer',
        position: 'relative'
    });
    checkbox.addEventListener('mouseenter', () => checkbox.style.backgroundColor = '#222');
    checkbox.addEventListener('mouseleave', () => checkbox.style.backgroundColor = checkbox.checked ? '#333' : '#111');
    checkbox.addEventListener('change', () => {
        tick.style.display = checkbox.checked ? 'block' : 'none';
        checkbox.style.backgroundColor = checkbox.checked ? '#333' : '#111';
        createCanvas();
    });

    const tick = document.createElement('img');
    tick.src = 'tick.svg';
    Object.assign(tick.style, {
        width: '22px',
        height: '22px',
        position: 'absolute',
        pointerEvents: 'none',
        display: checkbox.checked ? 'block' : 'none'
    });

    const elementLabel = document.createElement('label');
    elementLabel.htmlFor = id;
    elementLabel.textContent = label;

    container.append(checkbox, tick, elementLabel);
    return container;
}

export function createTextbox({ label, id, defaultValue }) {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px'
    });

    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;

    const textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.id = id;
    textbox.placeholder = 'Type here...';
    textbox.value = defaultValue;
    Object.assign(textbox.style, {
        width: '200px',
        padding: '4px',
        border: '1px solid #444',
        color: '#fff',
        background: '#111',
        outline: 'none',
        cursor: 'text',
        userSelect: 'text',
        font: 'inherit'
    });
    textbox.addEventListener('mouseenter', () => textbox.style.backgroundColor = '#222');
    textbox.addEventListener('mouseleave', () => textbox.style.backgroundColor = '#111');
    textbox.addEventListener('input', () => createCanvas());

    container.append(labelElement, textbox);
    return container;
}


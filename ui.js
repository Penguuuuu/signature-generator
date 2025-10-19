import { createCanvas } from './canvas.js';
import { helpers } from './helpers.js';

export function createDropdown({label, options, id, defaultValue}) {
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

export function createButton({label = '', id, text = '', width = 'max-content', height = 'max-content'}) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    Object.assign(button.style, {
        width: width,
        height: height,
        backgroundColor: '#333',
        color: 'white',
        border: '1px solid #444',
        borderRadius: '0',
        padding: '2px',
        cursor: 'pointer',
        font: 'inherit'
    });
    button.addEventListener('mouseenter', () => button.style.backgroundColor = '#444');
    button.addEventListener('mouseleave', () => button.style.backgroundColor = '#333');
    button.addEventListener('mousedown', () => button.style.transform = 'scale(0.98)');
    button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');

    if (label) {
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

        container.append(labelElement, button);
        return container;
    }

    return button;
}

export function createCheckbox({label, id, defaultValue}) {
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
    checkbox.addEventListener('mouseenter', () => checkbox.style.backgroundColor = checkbox.checked ? '#444' : '#222');
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

export function createInputText({label = '', id, defaultValue, width, placeholder = ''}) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.placeholder = placeholder;
    input.value = defaultValue;
    Object.assign(input.style, {
        width: width,
        padding: '4px',
        border: '1px solid #444',
        color: '#fff',
        background: '#111',
        outline: 'none',
        cursor: 'text',
        userSelect: 'text',
        font: 'inherit'
    });
    input.addEventListener('mouseenter', () => input.style.backgroundColor = '#222');
    input.addEventListener('mouseleave', () => input.style.backgroundColor = '#111');

    if (label) {
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

        container.append(labelElement, input);
        return container;
    }

    return input;
}

export function createContainer({id, flexDirection, gap = ''}) {
    const container = document.createElement('div');
    container.id = id;
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: flexDirection,
        alignItems: 'center',
        gap: gap
    });

    return container;
}

export function createImageSection() {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px'
    });

    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'imageInput';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.addEventListener('change', () => createCanvas());

    const button = createButton({ id: 'buttonImage', text: 'Select Image', label: 'Image Selector' });
    button.addEventListener('click', () => input.click());

    container.append(button, input);
    return container;
}

export function createTextSection() {
    const containerCenterButtons = createContainer({id: 'containerCenterButtons', flexDirection: 'column'});
    const buttonHorizontal = createButton({id: 'buttonHorizontal', text: 'Center Horizontal'});
    const buttonVertical = createButton({id: 'buttonVertical', text: 'Center Vertical'});
    containerCenterButtons.append(buttonHorizontal, buttonVertical);

    const containerDirectionalButtons = createContainer({id: 'containerDirectionalButtons', flexDirection: 'column'});
    const up = createButton({id: 'up', width: '22px', height: '22px'});
    const left = createButton({id: 'left', width: '22px', height: '22px'});
    const right = createButton({id: 'right', width: '22px', height: '22px'});
    const down = createButton({id: 'down', width: '22px', height: '22px'});
    const row1 = createContainer({flexDirection: 'row'});
    row1.append(up);
    const row2 = createContainer({flexDirection: 'row', gap: '22px'});
    row2.append(left, right);
    const row3 = createContainer({flexDirection: 'row'});
    row3.append(down);
    containerDirectionalButtons.append(row1, row2, row3);

    const containerCoordinates = createContainer({id: 'containerCoordinates', flexDirection: 'column'});
    const x = createInputText({id: 'x', defaultValue: 175, width: '50px'});
    const y = createInputText({id: 'y', defaultValue: 10, width: '50px'});
    containerCoordinates.append(x, y);

    const container = createContainer({id: 'container', flexDirection: 'row'});
    container.append(containerDirectionalButtons, containerCoordinates, containerCenterButtons);

    return container;
}
import { updateCanvas } from './canvas.js';
import { helpers } from './helpers.js';

export function createDropdown({label, options, id, defaultValue}) {
    function dropdownColor() {
        if (containerOptions.style.display === 'block') {
            dropdown.style.background = '#222';
            arrow.style.transform = 'rotate(180deg)';
        }
        else {
            dropdown.style.background = '#111';
            arrow.style.transform = 'rotate(0deg)';
        }
    }

    const arrow = document.createElement('img');
    arrow.src = 'arrow.svg';
    Object.assign(arrow.style, {
        width: '18px',
        height: '18px',
        pointerEvents: 'none',
    });

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
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '200px',
        padding: '4px',
        border: '1px solid #444',
        background: '#111',
        cursor: 'pointer',
        userSelect: 'none',
        justifyContent: 'space-between'
    });
    dropdown.addEventListener('mouseenter', () => dropdown.style.background = '#222');
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
        background: '#111',
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
        item.addEventListener('mouseenter', () => item.style.background = '#333');
        item.addEventListener('mouseleave', () => item.style.background = '');
        item.addEventListener('click', () => {
            selected.textContent = item.textContent;
            dropdownColor();
            updateCanvas();
        });
        containerOptions.appendChild(item);
    });

    document.addEventListener('click', () => {
        containerOptions.style.display = 'none';
        dropdownColor();
    });

    dropdown.append(selected, arrow, containerOptions);
    container.append(elementLabel, dropdown);
    return container;
}

export function createButton({label = '', id, text = '', width = 'max-content', height = '28px'}) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    Object.assign(button.style, {
        width: width,
        height: height,
        color: '#fff',
        background: '#333',
        border: '1px solid #444',
        borderRadius: '0',
        padding: '2px',
        cursor: 'pointer',
        font: 'inherit'
    });
    button.addEventListener('mouseenter', () => button.style.background = '#444');
    button.addEventListener('mouseleave', () => {
        button.style.background = '#333';
        button.style.transform = 'scale(1)';
    });
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
    checkbox.addEventListener('mouseenter', () => checkbox.style.background = checkbox.checked ? '#444' : '#222');
    checkbox.addEventListener('mouseleave', () => checkbox.style.background = checkbox.checked ? '#333' : '#111');
    checkbox.addEventListener('change', () => {
        tick.style.display = checkbox.checked ? 'block' : 'none';
        checkbox.style.background = checkbox.checked ? '#333' : '#111';
        updateCanvas();
    });

    const tick = document.createElement('img');
    tick.src = 'tick.svg';
    Object.assign(tick.style, {
        width: '18px',
        height: '18px',
        position: 'absolute',
        pointerEvents: 'none',
        transform: 'translate(2px, 0)',
        display: checkbox.checked ? 'block' : 'none'
    });

    const elementLabel = document.createElement('label');
    elementLabel.htmlFor = id;
    elementLabel.textContent = label;

    container.append(checkbox, tick, elementLabel);
    return container;
}

export function createInputText({label = '', flexDirection = 'column', id, defaultValue = '', width, placeholder = ''}) {
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
    input.addEventListener('mouseenter', () => input.style.background = '#222');
    input.addEventListener('mouseleave', () => input.style.background = '#111');

    if (label) {
        const container = document.createElement('div');
        Object.assign(container.style, {
            display: 'flex',
            flexDirection: flexDirection,
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

export function createContainer({id, flexDirection, gap = '', alignItems = 'center'}) {
    const container = document.createElement('div');
    container.id = id;
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: flexDirection,
        alignItems: alignItems,
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
    input.addEventListener('change', () => updateCanvas());

    const button = createButton({ id: 'buttonImage', text: 'Select Image', label: 'Image Selector' });
    button.addEventListener('click', () => input.click());

    container.append(button, input);
    return container;
}

export function createTextSection() {
    function addIcon (button, rotation) {
        const img = document.createElement('img');
        img.src = 'arrow.svg';
        Object.assign(img.style, {
            width: '18px',
            height: '18px',
            transform: `rotate(${rotation}deg)`,
            pointerEvents: 'none'
        });

        Object.assign(button.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });

        button.appendChild(img);
    };

    const containerCenterButtons = createContainer({id: 'containerCenterButtons', flexDirection: 'column'});
    const buttonHorizontal = createButton({id: 'buttonHorizontal', text: 'Center Horizontal'});
    const buttonVertical = createButton({id: 'buttonVertical', text: 'Center Vertical'});
    containerCenterButtons.append(buttonHorizontal, buttonVertical);

    const containerDirectionalButtons = createContainer({id: 'containerDirectionalButtons', flexDirection: 'column'});
    const up = createButton({id: 'up', width: '22px', height: '22px'});
    addIcon(up, 180);
    const left = createButton({id: 'left', width: '22px', height: '22px'});
    addIcon(left, 90);
    const right = createButton({id: 'right', width: '22px', height: '22px'});
    addIcon(right, 270);
    const down = createButton({id: 'down', width: '22px', height: '22px'});
    addIcon(down, 0);
    const row1 = createContainer({flexDirection: 'row'});
    row1.appendChild(up);
    const row2 = createContainer({flexDirection: 'row', gap: '22px'});
    row2.append(left, right);
    const row3 = createContainer({flexDirection: 'row'});
    row3.appendChild(down);
    containerDirectionalButtons.append(row1, row2, row3);

    const containerCoordinates = createContainer({id: 'containerCoordinates', flexDirection: 'column'});
    const x = createInputText({id: 'x', width: '50px', flexDirection: 'row', label: 'X:'});
    const y = createInputText({id: 'y', width: '50px', flexDirection: 'row', label: 'Y:'});
    containerCoordinates.append(x, y);

    const container = createContainer({id: 'container', flexDirection: 'row'});
    container.append(containerDirectionalButtons, containerCoordinates, containerCenterButtons);

    return container;
}

export function createStripesSection() {
    const container = createContainer({id: 'containerStripes', flexDirection: 'column', alignItems: 'left'});
    const thickness = createInputText({id: 'stripesThickness', width: '50px', flexDirection: 'row', label: 'Stripes Thickness:'});
    const gap = createInputText({id: 'stripesGap', width: '50px', flexDirection: 'row', label: 'Stripes Gap:'});
    const color = createInputText({id: 'stripesColor', width: 'max-content', flexDirection: 'row', label: 'Stripes Color:'});

    container.append(thickness, gap, color);
    return container;
}
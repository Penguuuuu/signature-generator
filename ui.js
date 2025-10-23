import { updateCanvas } from './canvas.js';
import { helpers } from './helpers.js';

export function createHeader({id, title}) {
    const container = createContainer({id: id, flexDirection: 'column'})

    const titleElement = document.createElement('div');
    titleElement.textContent = title;
    Object.assign(titleElement.style, {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        fontWeight: 'bold',
        borderBottom: '1px solid #444'
    });

    container.append(titleElement);
    return container
}

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
        width: '100%',
        height: '24px',
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
            cursor: 'pointer',
            height: '24px'
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

export function createButton({label = '', id, text = '', width = 'max-content', height = '24px'}) {
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
        width: '18px',
        height: '18px',
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
        width: '16px',
        height: '16px',
        position: 'absolute',
        pointerEvents: 'none',
        transform: 'translate(1px, 0)',
        display: checkbox.checked ? 'block' : 'none'
    });

    const elementLabel = document.createElement('label');
    elementLabel.htmlFor = id;
    elementLabel.textContent = label;

    container.append(checkbox, tick, elementLabel);
    return container;
}

export function createInputText(...inputs) {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'grid',
        gridTemplateColumns: 'max-content auto',
        gap: '5px'
    });

    inputs.forEach(({ id, labelText = '', placeholder = '', inputText = '' }) => {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = id;
        Object.assign(label.style, {
            display: 'flex',
            alignItems: 'center'
        });

        const input = document.createElement('input');
        input.type = 'text';
        input.id = id;
        input.placeholder = placeholder;
        input.value = inputText;
        Object.assign(input.style, {
            height: '24px',
            padding: '4px',
            border: '1px solid #444',
            color: '#fff',
            background: '#111',
            outline: 'none',
            cursor: 'text',
            userSelect: 'text',
            font: 'inherit',
            width: '100%',
        });
        input.addEventListener('mouseenter', () => input.style.background = '#222');
        input.addEventListener('mouseleave', () => input.style.background = '#111');

        container.append(label, input);
    });

    return container;
}

export function createContainer({id = '', flexDirection, gap = '', alignItems = 'center'}) {
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

export function createMovementButtons(id) {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    });

    function addIcon ({button, rotation}) {
        const image = document.createElement('img');
        image.src = 'arrow.svg';
        Object.assign(image.style, {
            width: '22px',
            height: '22px',
            transform: `translate(-2px, -1px) rotate(${rotation}deg)`,
            pointerEvents: 'none'
        });

        button.appendChild(image);
    };

    const containerDirectionalButtons = createContainer({flexDirection: 'column', gap: '5px'});
    const diagonalUpLeft = createButton({id: `${id}UpLeft`, width: '24px'});
    const up = createButton({id: `${id}Up`, width: '24px'});
    const diagonalUpRight = createButton({id: `${id}UpRight`, width: '24px'});

    const left = createButton({id: `${id}Left`, width: '24px'});
    const right = createButton({id: `${id}Right`, width: '24px'});

    const diagonalDownLeft = createButton({id: `${id}DownLeft`, width: '24px'});
    const down = createButton({id: `${id}Down`, width: '24px'});
    const diagonalDownRight = createButton({id: `${id}DownRight`, width: '24px'});

    addIcon({ button: diagonalUpLeft, rotation: 135 });
    addIcon({ button: up, rotation: 180 });
    addIcon({ button: diagonalUpRight, rotation: -135 });
    addIcon({ button: left, rotation: 90 });
    addIcon({ button: right, rotation: -90 });
    addIcon({ button: diagonalDownLeft, rotation: 45 });
    addIcon({ button: down, rotation: 0 });
    addIcon({ button: diagonalDownRight, rotation: -45 });

    const row1 = createContainer({flexDirection: 'row', gap: '5px'});
    const row2 = createContainer({flexDirection: 'row', gap: '34px'});
    const row3 = createContainer({flexDirection: 'row', gap: '5px'});

    row1.append(diagonalUpLeft, up, diagonalUpRight);
    row2.append(left, right);
    row3.append(diagonalDownLeft, down, diagonalDownRight);
    containerDirectionalButtons.append(row1, row2, row3);
    container.append(containerDirectionalButtons);
    return container;
}

export function createStripesSection() {
    const container = createContainer({flexDirection: 'column', alignItems: 'left', gap: '5px'});
    const header = createHeader({id: 'stripes', title: 'Stripes'});

    const checkbox = createCheckbox({
        label: 'Stripes',
        id: 'checkboxStripes',
        defaultValue: true
    });

    const containerInput = createInputText(
        { labelText: 'Thickness:', id: 'stripesThickness' },
        { labelText: 'Gap:', id: 'stripesGap' },
        { labelText: 'Color:', id: 'stripesColor' },
        { labelText: 'Angle:', id: 'stripesAngle' }
    );

    container.append(header, checkbox, containerInput);
    return container;
}

export function createTextSection() {
    const container = createContainer({flexDirection: 'column', alignItems: 'left', gap: '5px'});
    const header = createHeader({id: 'TextSection', title: 'Text'});

    const checkbox = createCheckbox({
        label: 'Outline',
        id: 'checkboxOutlineText',
        defaultValue: true
    });

    const containerInputAdjust = createInputText(
        { labelText: 'X:', id: 'x' },
        { labelText: 'Y:', id: 'y' }
    );

    const containerInput = createInputText(
        { labelText: 'Text:', id: 'textBox', inputText: 'Touhou Enjoyer', placeholder: 'Type here...' }
    );

    const dropdown = createDropdown({
        label: 'Text Type',
        options: ['solid', 'gradient'],
        id: 'typeText',
        defaultValue: 'gradient'
    });

    const buttonsDirectional = createMovementButtons('text');

    const containerAdjust = createContainer({flexDirection: 'row', alignItems: 'end', gap: '5px'});
    containerAdjust.append(buttonsDirectional, containerInputAdjust)

    container.append(header, checkbox, containerInput, containerAdjust, dropdown)
    return container;
}
console.log("Hello, world!");

const box = document.querySelector('.box');
const button = document.querySelector('.button');

const colors = [
    '#ff9800', // orange
    '#673ab7', // purple
    '#4caf50', // green
    '#2196f3', // blue
    '#e91e63', // pink
    '#00bcd4', // cyan
    '#f44336', // red
    '#ffc107', // amber
    '#8bc34a', // light green
    '#3f51b5'  // indigo
];
let usedColors = [];

function getNextColor(currentColor) {
    const available = colors.filter(c => c !== currentColor && !usedColors.includes(c));
    if (available.length === 0) {
        usedColors = [];
        return getNextColor(currentColor);
    }
    const next = available[Math.floor(Math.random() * available.length)];
    usedColors.push(next);
    return next;
}

function getContrastColor(hex) {
    const hexVal = hex.replace('#', '');
    const r = parseInt(hexVal.substring(0,2), 16);
    const g = parseInt(hexVal.substring(2,4), 16);
    const b = parseInt(hexVal.substring(4,6), 16);
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminance > 0.5 ? '#222' : '#fff';
}

if (box && button) {
    button.addEventListener('click', () => {
        let currentColor = box.style.background || window.getComputedStyle(box).backgroundColor;
        if (currentColor.includes('gradient')) currentColor = '';
        const nextColor = getNextColor(currentColor);
        box.style.background = nextColor;
        box.style.transform = 'scale(1.2)';
        box.style.color = getContrastColor(nextColor);
        setTimeout(() => {
            box.style.transform = 'scale(1)';
        }, 300);
    });
}
import * as ROT from "rot-js";

const SCREEN_WIDTH = 80;
const SCREEN_HEIGHT = 25;

const display = new ROT.Display({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
});

function drawCharacter(x, y, character, fgColor, bgColor) {
    display.draw(x, y, character, fgColor, bgColor);
}

function clearDisplay() {
    display.clear();
}

export const initializeGame = () => {
    document.body.appendChild(display.getContainer());

    clearDisplay();

    drawCharacter(10, 5, "@", "red");
    drawCharacter(25, 4, "#", "blue", "#fff");
};

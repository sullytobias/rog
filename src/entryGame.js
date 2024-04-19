import { DISPLAY } from "./constants/screen";

import { generateDungeon } from "./utils/generateDungeon";

const clearDisplay = () => DISPLAY.clear();

export const initializeGame = () => {
    document.body.appendChild(DISPLAY.getContainer());

    clearDisplay();

    generateDungeon(DISPLAY);
};

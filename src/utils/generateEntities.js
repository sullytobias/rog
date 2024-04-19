import { DISPLAY } from "../constants/screen";

export const generateEntities = (x, y, character, fgColor, bgColor) =>
    DISPLAY.draw(x, y, character, fgColor, bgColor);

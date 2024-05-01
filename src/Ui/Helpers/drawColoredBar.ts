import { Display } from "rot-js";

import { Colors } from "../../Colors/Colors";

export function drawColoredBar(
    display: Display,
    x: number,
    y: number,
    width: number,
    color: Colors
) {
    for (let pos = x; pos < x + width; pos++) {
        display.draw(pos, y, " ", color, color);
    }
}

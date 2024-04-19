import * as ROT from "rot-js";

const map = new ROT.Map.Arena(20, 10);

export const generateArena = (display) =>
    map.create((x, y, wall) =>
        display.draw(x, y, wall ? "#" : ".", wall ? "grey" : "white")
    );

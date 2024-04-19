import * as ROT from "rot-js";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/screen";

import { generateEntities } from "../utils/generateEntities";

const dungeonMap = new ROT.Map.Digger(SCREEN_WIDTH, SCREEN_HEIGHT);

export const generateDungeon = (display) => {
    dungeonMap.create((x, y, wall) =>
        generateEntities(x, y, wall ? "#" : ".", wall ? "grey" : "white")
    );

    const rooms = dungeonMap.getRooms();

    rooms.forEach((room) => {
        room.getDoors((x, y) => generateEntities(x, y, "+", "yellow"));
    });
};

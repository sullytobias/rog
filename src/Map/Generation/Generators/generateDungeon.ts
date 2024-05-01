import { Display } from "rot-js";

import { FLOOR_TILE } from "../../../Tiles/Floor_Tile";
import { STAIRS_DOWN_TILE } from "../../../Tiles/Stair_Down_Tile";

import { GameMap } from "../../Map";

import { generateRandomNumber } from "./generateRandomNumber";

import { Base as BaseEntity } from "../../../Entity/Base";

import { connectRooms } from "../Helpers/connectRooms";
import { placeEntities } from "../Helpers/placeEntities";

import { RectangularRoom } from "../Rooms/RectangularRoom";

export function generateDungeon(
    mapWidth: number,
    mapHeight: number,
    maxRooms: number,
    minSize: number,
    maxSize: number,
    player: BaseEntity,
    display: Display,
    currentFloor: number
): GameMap {
    const dungeon = new GameMap(mapWidth, mapHeight, display, [player]);

    const rooms: RectangularRoom[] = [];

    let centerOfLastRoom: [number, number] = [0, 0];

    for (let count = 0; count < maxRooms; count++) {
        const width = generateRandomNumber(minSize, maxSize);
        const height = generateRandomNumber(minSize, maxSize);

        const x = generateRandomNumber(0, mapWidth - width - 1);
        const y = generateRandomNumber(0, mapHeight - height - 1);

        const newRoom = new RectangularRoom(x, y, width, height);

        if (rooms.some((r) => r.intersects(newRoom))) {
            continue;
        }

        dungeon.addRoom(x, y, newRoom.tiles);

        placeEntities(newRoom, dungeon, currentFloor);

        rooms.push(newRoom);

        centerOfLastRoom = newRoom.center;
    }

    const startPoint = rooms[0].center;
    player.x = startPoint[0];
    player.y = startPoint[1];

    for (let index = 0; index < rooms.length - 1; index++) {
        const first = rooms[index];
        const second = rooms[index + 1];

        for (let tile of connectRooms(first, second)) {
            dungeon.tiles[tile[1]][tile[0]] = { ...FLOOR_TILE };
        }
    }

    dungeon.tiles[centerOfLastRoom[1]][centerOfLastRoom[0]] = {
        ...STAIRS_DOWN_TILE,
    };
    dungeon.downstairsLocation = centerOfLastRoom;

    return dungeon;
}

import { Entity } from "./Entity";

export function spawnPlayer(x: number, y: number): Entity {
    return new Entity(x, y, "@", "#fff", "#000", "Player", true);
}

export function spawnOrc(x: number, y: number): Entity {
    return new Entity(x, y, "o", "#3f7f3f", "#000", "Orc", true);
}

export function spawnTroll(x: number, y: number): Entity {
    return new Entity(x, y, "T", "#007f00", "#000", "Troll", true);
}

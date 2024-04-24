import { HostileEnemy } from "../Components/Ai";
import { Fighter } from "../Components/Fighter";
import { Actor, Entity } from "./Entity";

export function spawnPlayer(x: number, y: number): Actor {
    return new Actor(
        x,
        y,
        "@",
        "#fff",
        "#000",
        "Player",
        null,
        new Fighter(30, 2, 5)
    );
}

export function spawnOrc(x: number, y: number): Entity {
    return new Actor(
        x,
        y,
        "o",
        "#3f7f3f",
        "#000",
        "Orc",
        new HostileEnemy(),
        new Fighter(10, 0, 3)
    );
}

export function spawnTroll(x: number, y: number): Entity {
    return new Actor(
        x,
        y,
        "T",
        "#007f00",
        "#000",
        "Troll",
        new HostileEnemy(),
        new Fighter(16, 1, 4)
    );
}

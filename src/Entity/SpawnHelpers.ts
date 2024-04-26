import { HostileEnemy } from "../Components/Ai";
import { HealingConsumable } from "../Components/Consumable";
import { Fighter } from "../Components/Fighter";
import { Inventory } from "../Components/Inventory";
import { GameMap } from "../Map/Map";
import { Actor, Entity, Item } from "./Entity";

export function spawnPlayer(
    x: number,
    y: number,
    gameMap: GameMap | null = null
): Actor {
    return new Actor(
        x,
        y,
        "@",
        "#fff",
        "#000",
        "Player",
        null,
        new Fighter(30, 2, 5),
        new Inventory(26),
        gameMap
    );
}

export function spawnOrc(gameMap: GameMap, x: number, y: number): Entity {
    return new Actor(
        x,
        y,
        "o",
        "#3f7f3f",
        "#000",
        "Orc",
        new HostileEnemy(),
        new Fighter(10, 0, 3),
        new Inventory(0),
        gameMap
    );
}

export function spawnTroll(gameMap: GameMap, x: number, y: number): Entity {
    return new Actor(
        x,
        y,
        "T",
        "#007f00",
        "#000",
        "Troll",
        new HostileEnemy(),
        new Fighter(16, 1, 4),
        new Inventory(0),
        gameMap
    );
}

export function spawnHealthPotion(
    gameMap: GameMap,
    x: number,
    y: number
): Entity {
    return new Item(
        x,
        y,
        "!",
        "#7F00FF",
        "#000",
        "Health Potion",
        new HealingConsumable(4),
        gameMap
    );
}
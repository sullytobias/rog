import { HostileEnemy } from "../Components/Ai";
import {
    ConfusionConsumable,
    FireballDamageConsumable,
    HealingConsumable,
    LightningConsumable,
} from "../Components/Consumable";
import { Fighter } from "../Components/Fighter";
import { Inventory } from "../Components/Inventory";
import { Level } from "../Components/Level";
import { GameMap } from "../Map/Map";
import { Actor, Item } from "./Entity";

export function spawnPlayer(
    x: number,
    y: number,
    gameMap: GameMap | null = null
): Actor {
    const player = new Actor(
        x,
        y,
        "@",
        "#fff",
        "#000",
        "Player",
        null,
        new Fighter(30, 2, 5),
        new Inventory(26),
        new Level(20),
        gameMap
    );

    player.level.parent = player;
    return player;
}

export function spawnOrc(gameMap: GameMap, x: number, y: number): Actor {
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
        new Level(0, 35),
        gameMap
    );
}

export function spawnTroll(gameMap: GameMap, x: number, y: number): Actor {
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
        new Level(0, 100),
        gameMap
    );
}

export function spawnHealthPotion(
    gameMap: GameMap,
    x: number,
    y: number
): Item {
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

export function spawnLightningScroll(
    gameMap: GameMap,
    x: number,
    y: number
): Item {
    return new Item(
        x,
        y,
        "~",
        "#FFFF00",
        "#000",
        "Lightning Scroll",
        new LightningConsumable(20, 5),
        gameMap
    );
}

export function spawnConfusionScroll(
    gameMap: GameMap,
    x: number,
    y: number
): Item {
    return new Item(
        x,
        y,
        "~",
        "#cf3fff",
        "#000",
        "Confusion Scroll",
        new ConfusionConsumable(10),
        gameMap
    );
}

export function spawnFireballScroll(
    gameMap: GameMap,
    x: number,
    y: number
): Item {
    return new Item(
        x,
        y,
        "~",
        "#ff0000",
        "#000",
        "Fireball Scroll",
        new FireballDamageConsumable(12, 3),
        gameMap
    );
}


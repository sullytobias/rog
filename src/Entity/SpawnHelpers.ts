import { HostileEnemy } from "../Components/Ai";
import {
    ConfusionConsumable,
    FireballDamageConsumable,
    HealingConsumable,
    LightningConsumable,
} from "../Components/Consumable";
import { Equipment } from "../Components/Equipment";
import {
    Dagger,
    Sword,
    LeatherArmor,
    ChainMail,
} from "../Components/Equippable";
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
        new Equipment(),
        new Fighter(30, 1, 2),
        new Inventory(26),
        new Level(200),
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
        new Equipment(),
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
        new Equipment(),
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
        null,
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
        null,
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
        null,
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
        null,
        gameMap
    );
}

export function spawnDagger(gameMap: GameMap, x: number, y: number): Item {
    return new Item(
        x,
        y,
        "/",
        "#00bfff",
        "#000",
        "Dagger",
        null,
        new Dagger(),
        gameMap
    );
}

export function spawnSword(gameMap: GameMap, x: number, y: number): Item {
    return new Item(
        x,
        y,
        "/",
        "#00bfff",
        "#000",
        "Sword",
        null,
        new Sword(),
        gameMap
    );
}

export function spawnLeatherArmor(
    gameMap: GameMap,
    x: number,
    y: number
): Item {
    return new Item(
        x,
        y,
        "[",
        "#8b4513",
        "#000",
        "Leather Armor",
        null,
        new LeatherArmor(),
        gameMap
    );
}

export function spawnChainMail(gameMap: GameMap, x: number, y: number): Item {
    return new Item(
        x,
        y,
        "[",
        "#8b4513",
        "#000",
        "Chain Mail",
        null,
        new ChainMail(),
        gameMap
    );
}
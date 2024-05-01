import { HealingConsumable } from "../../../../Components/Consumables/HealingConsumable";

import { GameMap } from "../../../../Map/Map";

import { Item } from "../../../Item";

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

import { ConfusionConsumable } from "../../../../Components/Consumables/ConfusionConsumable";

import { GameMap } from "../../../../Map/Map";

import { Item } from "../../../Item";

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

import { LightningConsumable } from "../../../../Components/Consumables/LightningConsumable";
import { GameMap } from "../../../../Map/Map";
import { Item } from "../../../Item";

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

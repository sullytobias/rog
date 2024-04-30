import { FireballDamageConsumable } from "../../../../Components/Consumables/FireballDamageConsumable";
import { GameMap } from "../../../../Map/Map";
import { Item } from "../../../Item";

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

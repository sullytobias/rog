import { LeatherArmor } from "../../../../Components/Equippable";
import { GameMap } from "../../../../Map/Map";
import { Item } from "../../../Item";

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

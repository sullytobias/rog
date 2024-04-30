import { ChainMail } from "../../../../Components/Equippable";
import { GameMap } from "../../../../Map/Map";
import { Item } from "../../../Item";

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

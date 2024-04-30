import { Sword } from "../../../../Components/Equippable";
import { GameMap } from "../../../../Map/Map";
import { Item } from "../../../Item";

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

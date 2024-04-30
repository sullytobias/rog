import { Dagger } from "../../../../Components/Equippable";
import { GameMap } from "../../../../Map/Map";
import { Item } from "../../../Item";

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

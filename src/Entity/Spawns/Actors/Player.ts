import { Equipment } from "../../../Components/Equipment";
import { Fighter } from "../../../Components/Fighter";
import { Inventory } from "../../../Components/Inventory";
import { Level } from "../../../Components/Level";
import { GameMap } from "../../../Map/Map";
import { Actor } from "../../Actor";

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

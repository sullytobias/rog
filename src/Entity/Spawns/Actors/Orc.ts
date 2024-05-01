import { HostileEnemy } from "../../../Components/Ai";
import { Equipment } from "../../../Components/Equipment";
import { Fighter } from "../../../Components/Fighter";
import { Inventory } from "../../../Components/Inventory";
import { Level } from "../../../Components/Level";

import { GameMap } from "../../../Map/Map";

import { Actor } from "../../Actor";

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

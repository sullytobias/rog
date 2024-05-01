import { HostileEnemy } from "../../../Components/Ai";
import { Equipment } from "../../../Components/Equipment";
import { Fighter } from "../../../Components/Fighter";
import { Inventory } from "../../../Components/Inventory";
import { Level } from "../../../Components/Level";

import { GameMap } from "../../../Map/Map";

import { Actor } from "../../Actor";

export function spawnTroll(gameMap: GameMap, x: number, y: number): Actor {
    return new Actor(
        x,
        y,
        "T",
        "#007f00",
        "#000",
        "Troll",
        new HostileEnemy(),
        new Equipment(),
        new Fighter(16, 1, 4),
        new Inventory(0),
        new Level(0, 100),
        gameMap
    );
}

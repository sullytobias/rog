import { Colors } from "../../Colors/Colors";

import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { Base as BaseEntity } from "../../Entity/Base";

import { GameMap } from "../../Map/Map";

import { Base } from "./Base";

export class TakeStairsAction extends Base {
    perform(entity: BaseEntity, gameMap: GameMap) {
        if (
            entity.x === gameMap.downstairsLocation[0] &&
            entity.y == gameMap.downstairsLocation[1]
        ) {
            window.engine.screen.generateFloor();
            window.messageLog.addMessage(
                "You descend the staircase.",
                Colors.Descend
            );
        } else {
            throw new ImpossibleException("There are no stairs here.");
        }
    }
}

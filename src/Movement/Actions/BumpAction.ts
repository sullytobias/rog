import { Actor } from "../../Entity/Actor";
import { Base as BaseEntity } from "../../Entity/Base";

import { GameMap } from "../../Map/Map";

import { ActionWithDirection } from "./ActionWithDirection";
import { MovementAction } from "./MovementAction";
import { MeleeAction } from "./MeleeAction";

export class BumpAction extends ActionWithDirection {
    perform(entity: BaseEntity, gameMap: GameMap) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (gameMap.getActorAtLocation(destX, destY)) {
            return new MeleeAction(this.dx, this.dy).perform(
                entity as Actor,
                gameMap
            );
        } else {
            return new MovementAction(this.dx, this.dy).perform(
                entity,
                gameMap
            );
        }
    }
}

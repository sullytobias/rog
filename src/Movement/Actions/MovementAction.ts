import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { GameMap } from "../../Map/Map";

import { ActionWithDirection } from "./ActionWithDirection";

import { Base as BaseEntity } from "../../Entity/Base";

export class MovementAction extends ActionWithDirection {
    perform(entity: BaseEntity, gameMap: GameMap) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (!gameMap.isInBounds(destX, destY)) {
            throw new ImpossibleException("That way is blocked.");
        }
        if (!gameMap.tiles[destY][destX].walkable) {
            throw new ImpossibleException("That way is blocked.");
        }
        if (gameMap.getBlockingEntityAtLocation(destX, destY)) {
            throw new ImpossibleException("That way is blocked.");
        }
        entity.move(this.dx, this.dy);
    }
}

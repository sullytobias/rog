import { Engine } from "../Engine/Engine";
import { Entity } from "../Entity/Entity";
import { Action } from "./interfaces";

export abstract class ActionWithDirection implements Action {
    constructor(public dx: number, public dy: number) {}

    perform(_engine: Engine, _entity: Entity) {}
}

export class MovementAction extends ActionWithDirection {
    perform(engine: Engine, entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (!engine.gameMap.isInBounds(destX, destY)) return;
        if (!engine.gameMap.tiles[destY][destX].walkable) return;
        if (engine.gameMap.getBlockingEntityAtLocation(destX, destY)) return;

        entity.move(this.dx, this.dy);
    }
}

export class MeleeAction extends ActionWithDirection {
    perform(engine: Engine, entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        const target = engine.gameMap.getBlockingEntityAtLocation(destX, destY);

        if (!target) return;

        console.log(`You kick the ${target.name}, much to its annoyance!`);
    }
}

export class BumpAction extends ActionWithDirection {
    perform(engine: Engine, entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (engine.gameMap.getBlockingEntityAtLocation(destX, destY)) {
            return new MeleeAction(this.dx, this.dy).perform(engine, entity);
        } else {
            return new MovementAction(this.dx, this.dy).perform(engine, entity);
        }
    }
}
  
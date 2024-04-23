import { Engine } from "../Engine/Engine";
import { Entity } from "../Entity/Entity";
import { Action } from "./interfaces";

export class MovementAction implements Action {
    dx: number;
    dy: number;

    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }

    perform(engine: Engine, entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (!engine.gameMap.isInBounds(destX, destY)) return;
        if (!engine.gameMap.tiles[destY][destX].walkable) return;

        entity.move(this.dx, this.dy);
    }
}

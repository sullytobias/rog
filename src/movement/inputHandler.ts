import { Colors } from "../Colors/Colors";
import { EngineState } from "../Engine/Engine";
import { Actor, Entity } from "../Entity/Entity";
import { Action } from "./interfaces";

export abstract class ActionWithDirection implements Action {
    constructor(public dx: number, public dy: number) {}

    perform(_entity: Entity) {}
}
export class WaitAction implements Action {
    perform(_entity: Entity) {}
}

export class MovementAction extends ActionWithDirection {
    perform(entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (!window.engine.gameMap.isInBounds(destX, destY)) return;
        if (!window.engine.gameMap.tiles[destY][destX].walkable) return;
        if (window.engine.gameMap.getBlockingEntityAtLocation(destX, destY))
            return;

        entity.move(this.dx, this.dy);
    }
}

export class MeleeAction extends ActionWithDirection {
    perform(actor: Actor) {
        const destX = actor.x + this.dx;
        const destY = actor.y + this.dy;

        const target = window.engine.gameMap.getActorAtLocation(destX, destY);

        if (!target) return;

        const damage = actor.fighter.power - target.fighter.defense;
        const attackDescription = `${actor.name.toUpperCase()} attacks ${
            target.name
        }`;

        const fg =
            actor.name === "Player" ? Colors.PlayerAttack : Colors.EnemyAttack;
        if (damage > 0) {
            window.engine.messageLog.addMessage(
                `${attackDescription} for ${damage} hit points.`,
                fg
            );
            target.fighter.hp -= damage;
        } else {
            window.engine.messageLog.addMessage(
                `${attackDescription} but does no damage.`,
                fg
            );
        }
    }
}
export class BumpAction extends ActionWithDirection {
    perform(entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (window.engine.gameMap.getBlockingEntityAtLocation(destX, destY)) {
            return new MeleeAction(this.dx, this.dy).perform(entity as Actor);
        } else {
            return new MovementAction(this.dx, this.dy).perform(entity);
        }
    }
}

export class LogAction implements Action {
    perform(_entity: Entity) {
        window.engine.state = EngineState.Log;
    }
}

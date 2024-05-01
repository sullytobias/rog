import { Colors } from "../../Colors/Colors";

import { Actor } from "../../Entity/Actor";

import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { GameMap } from "../../Map/Map";

import { ActionWithDirection } from "./ActionWithDirection";

export class MeleeAction extends ActionWithDirection {
    perform(actor: Actor, gameMap: GameMap) {
        const destX = actor.x + this.dx;
        const destY = actor.y + this.dy;

        const target = gameMap.getActorAtLocation(destX, destY);
        if (!target) {
            throw new ImpossibleException("Nothing to attack.");
        }
        const damage = actor.fighter.power - target.fighter.defense;
        const attackDescription = `${actor.name.toUpperCase()} attacks ${
            target.name
        }`;
        const fg =
            actor.name === "Player" ? Colors.PlayerAttack : Colors.EnemyAttack;
        if (damage > 0) {
            window.messageLog.addMessage(
                `${attackDescription} for ${damage} hit points.`,
                fg
            );
            target.fighter.hp -= damage;
        } else {
            window.messageLog.addMessage(
                `${attackDescription} but does no damage.`,
                fg
            );
        }
    }
}

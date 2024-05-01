import { Actor } from "../../Entity/Actor";
import { Base as BaseEntity } from "../../Entity/Base";
import { Item } from "../../Entity/Item";

import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { GameMap } from "../../Map/Map";

import { ItemAction } from "../../Movement/Actions/ItemAction";

import { Base } from "./Base";

export class LightningConsumable extends Base {
    constructor(
        public damage: number,
        public maxRange: number,
        parent: Item | null = null
    ) {
        super(parent);
    }

    activate(_action: ItemAction, entity: BaseEntity, gameMap: GameMap) {
        let target: Actor | null = null;
        let closestDistance = this.maxRange + 1.0;

        for (const actor of gameMap.actors) {
            if (
                !Object.is(actor, entity) &&
                gameMap.tiles[actor.y][actor.x].visible
            ) {
                const distance = entity.distance(actor.x, actor.y);
                if (distance < closestDistance) {
                    target = actor;
                    closestDistance = distance;
                }
            }
        }

        if (target) {
            window.messageLog.addMessage(
                `A lightning bolt strikes the ${target.name} with a loud thunder, for ${this.damage} damage!`
            );
            target.fighter.takeDamage(this.damage);
            this.consume();
        } else {
            window.messageLog.addMessage("No enemy is close enough to strike.");
            throw new ImpossibleException(
                "No enemy is close enough to strike."
            );
        }
    }
}

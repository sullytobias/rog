import { Colors } from "../../Colors/Colors";

import { Base as BaseEntity } from "../../Entity/Base";
import { Item } from "../../Entity/Item";

import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { AreaRangedAttackHandler } from "../../Handlers/AreaRangedAttackHandler";

import { GameMap } from "../../Map/Map";

import { Base as BaseAction } from "../../Movement/Actions/Base";
import { ItemAction } from "../../Movement/Actions/ItemAction";


import { Base } from "./Base";

export class FireballDamageConsumable extends Base {
    constructor(
        public damage: number,
        public radius: number,
        parent: Item | null = null
    ) {
        super(parent);
    }

    getAction(): BaseAction | null {
        window.messageLog.addMessage(
            "Select a target location.",
            Colors.NeedsTarget
        );
        window.engine.screen.inputHandler = new AreaRangedAttackHandler(
            this.radius,
            (x, y) => {
                return new ItemAction(this.parent, [x, y]);
            }
        );
        return null;
    }

    activate(action: ItemAction, _entity: BaseEntity, gameMap: GameMap) {
        const { targetPosition } = action;

        if (!targetPosition) {
            throw new ImpossibleException("You must select an area to target.");
        }
        const [x, y] = targetPosition;
        if (!gameMap.tiles[y][x].visible) {
            throw new ImpossibleException(
                "You cannot target an area that you cannot see."
            );
        }

        let targetsHit = false;
        for (let actor of gameMap.actors) {
            if (actor.distance(x, y) <= this.radius) {
                window.messageLog.addMessage(
                    `The ${actor.name} is engulfed in a fiery explosion, taking ${this.damage} damage!`
                );
                actor.fighter.takeDamage(this.damage);
                targetsHit = true;
            }
            if (!targetsHit) {
                throw new ImpossibleException(
                    "There are no targets in the radius."
                );
            }
            this.consume();
        }
    }
}

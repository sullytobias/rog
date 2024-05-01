import { Colors } from "../../Colors/Colors";

import { Base as BaseEntity } from "../../Entity/Base";
import { Item } from "../../Entity/Item";

import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { SingleRangedAttackHandler } from "../../Handlers/SingleRangedAttackHandler";

import { GameMap } from "../../Map/Map";

import { Base as BaseAction } from "../../Movement/Actions/Base";
import { ItemAction } from "../../Movement/Actions/ItemAction";

import { ConfusedEnemy } from "../Ai";

import { Base } from "./Base";

export class ConfusionConsumable extends Base {
    constructor(public numberOfTurns: number, parent: Item | null = null) {
        super(parent);
    }

    getAction(): BaseAction | null {
        window.messageLog.addMessage(
            "Select a target location.",
            Colors.NeedsTarget
        );
        window.engine.screen.inputHandler = new SingleRangedAttackHandler(
            (x, y) => {
                return new ItemAction(this.parent, [x, y]);
            }
        );
        return null;
    }

    activate(action: ItemAction, entity: BaseEntity, gameMap: GameMap) {
        const target = action.targetActor(gameMap);

        if (!target) {
            throw new ImpossibleException(
                "You must select an enemy to target."
            );
        }
        if (!gameMap.tiles[target.y][target.x].visible) {
            throw new ImpossibleException(
                "You cannot target an area you cannot see."
            );
        }
        if (Object.is(target, entity)) {
            throw new ImpossibleException("You cannot confuse yourself!");
        }

        window.messageLog.addMessage(
            `The eyes of the ${target.name} look vacant, as it starts to stumble around!`,
            Colors.StatusEffectApplied
        );

        target.ai = new ConfusedEnemy(target.ai, this.numberOfTurns);
        this.consume();
    }
}

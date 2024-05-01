import { Actor } from "../../Entity/Actor";
import { Item } from "../../Entity/Item";
import { Base as BaseEntity } from "../../Entity/Base";

import { GameMap } from "../../Map/Map";

import { Base } from "./Base";

export class ItemAction extends Base {
    constructor(
        public item: Item | null,
        public targetPosition: [number, number] | null = null
    ) {
        super();
    }

    targetActor(gameMap: GameMap): Actor | undefined {
        if (!this.targetPosition) {
            return;
        }
        const [x, y] = this.targetPosition;
        return gameMap.getActorAtLocation(x, y);
    }

    perform(entity: BaseEntity, gameMap: GameMap) {
        this.item?.consumable?.activate(this, entity, gameMap);
    }
}

import { Actor } from "../../Entity/Actor";
import { Base as BaseEntity } from "../../Entity/Base";

import { GameMap } from "../../Map/Map";

import { ItemAction } from "./ItemAction";

export class DropItemAction extends ItemAction {
    perform(entity: BaseEntity, gameMap: GameMap) {
        const dropper = entity as Actor;

        if (!dropper || !this.item) return;

        dropper.inventory.drop(this.item, gameMap);

        if (dropper.equipment.itemIsEquipped(this.item)) {
            dropper.equipment.toggleEquip(this.item);
        }
    }
}

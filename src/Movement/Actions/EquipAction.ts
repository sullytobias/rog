import { Actor } from "../../Entity/Actor";
import { Item } from "../../Entity/Item";
import { Base as BaseEntity } from "../../Entity/Base";

import { GameMap } from "../../Map/Map";

import { Base } from "./Base";

export class EquipAction extends Base {
    constructor(public item: Item) {
        super();
    }

    perform(entity: BaseEntity, _gameMap: GameMap) {
        const actor = entity as Actor;

        if (!actor) return;

        actor.equipment.toggleEquip(this.item);
    }
}

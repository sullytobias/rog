import { Base as BaseEntity } from "../../Entity/Base";
import { Item } from "../../Entity/Item";
import { GameMap } from "../../Map/Map";
import { Action, ItemAction } from "../../Movement/Actions";
import { Inventory } from "../Inventory";

export abstract class Base {
    protected constructor(public parent: Item | null) {}

    getAction(): Action | null {
        if (this.parent) {
            return new ItemAction(this.parent);
        }
        return null;
    }

    abstract activate(
        action: ItemAction,
        entity: BaseEntity,
        gameMap: GameMap
    ): void;

    consume() {
        const item = this.parent;
        if (item) {
            const inventory = item.parent;
            if (inventory instanceof Inventory) {
                const index = inventory.items.indexOf(item);
                if (index >= 0) {
                    inventory.items.splice(index, 1);
                }
            }
        }
    }
}

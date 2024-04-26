import { Colors } from "../Colors/Colors";
import { Actor, Entity, Item } from "../Entity/Entity";
import { ItemAction } from "../movement/Actions";
import { Action } from "../movement/interfaces";
import { Inventory } from "./Inventory";

export interface Consumable {
    parent: Item | null;
    getAction(): Action | null;
    activate(action: ItemAction, entity: Entity): void;
}

export class HealingConsumable implements Consumable {
    constructor(public amount: number, public parent: Item | null = null) {}

    getAction(): Action | null {
        if (this.parent) {
            return new ItemAction(this.parent);
        }
        return null;
    }

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

    activate(_action: ItemAction, entity: Entity) {
        const consumer = entity as Actor;
        if (!consumer) return;
        const amountRecovered = consumer.fighter.heal(this.amount);
        if (amountRecovered > 0) {
            window.engine.messageLog.addMessage(
                `You consume the ${this.parent?.name}, and recover ${amountRecovered} HP!`,
                Colors.HealthRecovered
            );

            this.consume();
        } else {
            window.engine.messageLog.addMessage(
                "Your health is already full.",
                Colors.Impossible
            );
            throw new Error("Your health is already full.");
        }
    }
}

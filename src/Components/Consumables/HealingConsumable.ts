import { Colors } from "../../Colors/Colors";
import { Actor } from "../../Entity/Actor";
import { Base as BaseEntity } from "../../Entity/Base";
import { Item } from "../../Entity/Item";
import { ImpossibleException } from "../../Exeptions/ImpossibleException";
import { Action, ItemAction } from "../../Movement/Actions";
import { Inventory } from "../Inventory";
import { Base } from "./Base";

export class HealingConsumable implements Base {
    constructor(public amount: number, public parent: Item | null = null) {}

    getAction(): Action | null {
        if (this.parent) return new ItemAction(this.parent);

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

    activate(_action: ItemAction, entity: BaseEntity) {
        const consumer = entity as Actor;
        if (!consumer) return;

        const amountRecovered = consumer.fighter.heal(this.amount);
        if (amountRecovered > 0) {
            window.messageLog.addMessage(
                `You consume the ${this.parent?.name}, and recover ${amountRecovered} HP!`,
                Colors.HealthRecovered
            );
            this.consume();
        } else {
            throw new ImpossibleException("Your health is already full.");
        }
    }
}

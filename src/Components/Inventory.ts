import { Actor, Item } from "../Entity/Entity";
import { Base } from "./Base";

export class Inventory extends Base {
    parent: Actor | null;
    items: Item[];

    constructor(public capacity: number) {
        super();
        this.parent = null;
        this.items = [];
    }

    drop(item: Item) {
        const index = this.items.indexOf(item);

        if (index >= 0) {
            this.items.splice(index, 1);

            if (this.parent)
                item.place(this.parent.x, this.parent.y, window.engine.gameMap);

            window.engine.messageLog.addMessage(
                `You dropped the ${item.name}."`
            );
        }
    }
}

import { Equippable } from "../Components/Equippable";
import { Base as BaseConsumable } from "../Components/Consumables/Base";
import { Base as BaseComponent } from "../Components/Base";

import { GameMap } from "../Map/Map";

import { Base } from "./Base";

import { RenderOrder } from "./RenderOrder";

export class Item extends Base {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public char: string = "?",
        public fg: string = "#fff",
        public bg: string = "#000",
        public name: string = "<Unnamed>",
        public consumable: BaseConsumable | null = null,
        public equippable: Equippable | null = null,
        public parent: GameMap | BaseComponent | null = null
    ) {
        super(x, y, char, fg, bg, name, false, RenderOrder.Item, parent);
        if (this.consumable) {
            this.consumable.parent = this;
        }

        if (this.equippable) {
            this.equippable.parent = this;
        }
    }
}

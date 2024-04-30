import { Ai } from "../Components/Ai";
import { Equipment } from "../Components/Equipment";
import { Fighter } from "../Components/Fighter";
import { Inventory } from "../Components/Inventory";
import { Level } from "../Components/Level";
import { GameMap } from "../Map/Map";
import { Base } from "./Base";
import { RenderOrder } from "./RenderOrder";

export class Actor extends Base {
    constructor(
        public x: number,
        public y: number,
        public char: string,
        public fg: string = "#fff",
        public bg: string = "#000",
        public name: string = "<Unnamed>",
        public ai: Ai | null,
        public equipment: Equipment,
        public fighter: Fighter,
        public inventory: Inventory,
        public level: Level,
        public parent: GameMap | null = null
    ) {
        super(x, y, char, fg, bg, name, true, RenderOrder.Actor, parent);
        this.fighter.parent = this;
        this.equipment.parent = this;
        this.inventory.parent = this;
    }

    public get isAlive(): boolean {
        return !!this.ai || window.engine.player === this;
    }
}

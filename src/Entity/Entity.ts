import { Ai } from "../Components/Ai";
import { Fighter } from "../Components/Fighter";

export enum RenderOrder {
    Corpse,
    Item,
    Actor,
}

export class Entity {
    constructor(
        public x: number,
        public y: number,
        public char: string,
        public fg: string = "#fff",
        public bg: string = "#000",
        public name: string = "<Unnamed>",
        public blocksMovement: boolean = false,
        public renderOrder: RenderOrder = RenderOrder.Corpse
    ) {}

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }
}

export class Actor extends Entity {
    constructor(
        public x: number,
        public y: number,
        public char: string,
        public fg: string = "#fff",
        public bg: string = "#000",
        public name: string = "<Unnamed>",
        public ai: Ai | null,
        public fighter: Fighter
    ) {
        super(x, y, char, fg, bg, name, true, RenderOrder.Actor);
        this.fighter.entity = this;
    }

    public get isAlive(): boolean {
        return !!this.ai || window.engine.player === this;
    }
}

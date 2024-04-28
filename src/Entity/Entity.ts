import { Ai } from "../Components/Ai";
import { Base } from "../Components/Base";
import { Consumable } from "../Components/Consumable";
import { Equipment } from "../Components/Equipment";
import { Equippable } from "../Components/Equippable";
import { Fighter } from "../Components/Fighter";
import { Inventory } from "../Components/Inventory";
import { Level } from "../Components/Level";
import { GameMap } from "../Map/Map";

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
        public renderOrder: RenderOrder = RenderOrder.Corpse,
        public parent: GameMap | Base | null = null
    ) {
        if (this.parent && this.parent instanceof GameMap) {
            this.parent.entities.push(this);
        }
    }

    public get gameMap(): GameMap | undefined {
        return this.parent?.gameMap;
    }

    distance(x: number, y: number) {
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    }

    place(x: number, y: number, gameMap: GameMap | undefined) {
        this.x = x;
        this.y = y;

        if (gameMap) {
            if (this.parent) {
                if (this.parent === gameMap) {
                    gameMap.removeEntity(this);
                }
            }

            this.parent = gameMap;
            gameMap.entities.push(this);
        }
    }

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

export class Item extends Entity {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public char: string = "?",
        public fg: string = "#fff",
        public bg: string = "#000",
        public name: string = "<Unnamed>",
        public consumable: Consumable | null = null,
        public equippable: Equippable | null = null,
        public parent: GameMap | Base | null = null
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


  
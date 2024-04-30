import { Base as BaseComponent } from "../Components/Base";
import { GameMap } from "../Map/Map";
import { RenderOrder } from "./RenderOrder";

export abstract class Base {
    constructor(
        public x: number,
        public y: number,
        public char: string,
        public fg: string = "#fff",
        public bg: string = "#000",
        public name: string = "<Unnamed>",
        public blocksMovement: boolean = false,
        public renderOrder: RenderOrder = RenderOrder.Corpse,
        public parent: GameMap | BaseComponent | null = null
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

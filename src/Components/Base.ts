import { Base as BaseEntity } from "../Entity/Base";
import { GameMap } from "../Map/Map";

export abstract class Base {
    parent: BaseEntity | null;

    protected constructor() {
        this.parent = null;
    }

    public get gameMap(): GameMap | undefined {
        return this.parent?.gameMap;
    }
}

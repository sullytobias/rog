import { Entity } from "../Entity/Entity";
import { GameMap } from "../Map/Map";

export abstract class Base {
    parent: Entity | null;

    protected constructor() {
        this.parent = null;
    }

    public get gameMap(): GameMap | undefined {
        return this.parent?.gameMap;
    }
}

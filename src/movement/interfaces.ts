import { Engine } from "../Engine/Engine";
import { Entity } from "../Entity/Entity";

export interface MovementMap {
    [key: string]: Action;
}
export interface Action {
    perform: (engine: Engine, entity: Entity) => void;
}

import { Entity } from "../Entity/Entity";

export interface MovementMap {
    [key: string]: Action;
}
export interface Action {
    perform: (entity: Entity) => void;
}

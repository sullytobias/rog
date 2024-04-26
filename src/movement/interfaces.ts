import { Entity } from "../Entity/Entity";

export interface Action {
    perform: (entity: Entity) => void;
}

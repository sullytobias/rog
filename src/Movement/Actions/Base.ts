import { GameMap } from "../../Map/Map";

import { Base as BaseEntity } from "../../Entity/Base";

export abstract class Base {
    abstract perform(entity: BaseEntity, gameMap: GameMap): void;
}

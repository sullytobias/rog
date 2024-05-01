import { Base } from "./Base";

import { Base as BaseEntity } from "../../Entity/Base";

import { GameMap } from "../../Map/Map";

export abstract class ActionWithDirection extends Base {
    constructor(public dx: number, public dy: number) {
        super();
    }

    abstract perform(entity: BaseEntity, gameMap: GameMap): void;
}

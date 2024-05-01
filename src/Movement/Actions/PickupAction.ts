import { Actor } from "../../Entity/Actor";
import { Base as BaseEntity } from "../../Entity/Base";

import { ImpossibleException } from "../../Exeptions/ImpossibleException";

import { GameMap } from "../../Map/Map";

import { Base } from "./Base";

export class PickupAction extends Base {
    perform(entity: BaseEntity, gameMap: GameMap) {
        const consumer = entity as Actor;
        if (!consumer) return;

        const { x, y, inventory } = consumer;

        for (const item of gameMap.items) {
            if (x === item.x && y == item.y) {
                if (inventory.items.length >= inventory.capacity) {
                    throw new ImpossibleException("Your inventory is full.");
                }

                gameMap.removeEntity(item);
                item.parent = inventory;
                inventory.items.push(item);

                window.messageLog.addMessage(`You picked up the ${item.name}!`);
                return;
            }
        }
        throw new ImpossibleException("There is nothing here to pick up.");
    }
}

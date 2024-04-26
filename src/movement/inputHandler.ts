import { Colors } from "../Colors/Colors";
import { EngineState } from "../Engine/Engine";
import { Actor, Entity, Item } from "../Entity/Entity";
import { Action } from "./interfaces";

export abstract class ActionWithDirection implements Action {
    constructor(public dx: number, public dy: number) {}

    perform(_entity: Entity) {}
}

export class WaitAction implements Action {
    perform(_entity: Entity) {}
}

export class MovementAction extends ActionWithDirection {
    perform(entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (!window.engine.gameMap.isInBounds(destX, destY)) {
            window.engine.messageLog.addMessage(
                "That way is blocked.",
                Colors.Impossible
            );
            throw new Error("That way is blocked.");
        }
        if (!window.engine.gameMap.tiles[destY][destX].walkable) {
            window.engine.messageLog.addMessage(
                "That way is blocked.",
                Colors.Impossible
            );
            throw new Error("That way is blocked.");
        }
        if (window.engine.gameMap.getBlockingEntityAtLocation(destX, destY)) {
            window.engine.messageLog.addMessage(
                "That way is blocked.",
                Colors.Impossible
            );
            throw new Error("That way is blocked.");
        }

        entity.move(this.dx, this.dy);
    }
}

export class MeleeAction extends ActionWithDirection {
    perform(actor: Actor) {
        const destX = actor.x + this.dx;
        const destY = actor.y + this.dy;

        const target = window.engine.gameMap.getActorAtLocation(destX, destY);

        if (!target) {
            window.engine.messageLog.addMessage(
                "Nothing to attack",
                Colors.Impossible
            );
            throw new Error("Nothing to attack.");
        }

        const damage = actor.fighter.power - target.fighter.defense;
        const attackDescription = `${actor.name.toUpperCase()} attacks ${
            target.name
        }`;

        const fg =
            actor.name === "Player" ? Colors.PlayerAttack : Colors.EnemyAttack;
        if (damage > 0) {
            window.engine.messageLog.addMessage(
                `${attackDescription} for ${damage} hit points.`,
                fg
            );
            target.fighter.hp -= damage;
        } else {
            window.engine.messageLog.addMessage(
                `${attackDescription} but does no damage.`,
                fg
            );
        }
    }
}

export class BumpAction extends ActionWithDirection {
    perform(entity: Entity) {
        const destX = entity.x + this.dx;
        const destY = entity.y + this.dy;

        if (window.engine.gameMap.getBlockingEntityAtLocation(destX, destY)) {
            return new MeleeAction(this.dx, this.dy).perform(entity as Actor);
        } else {
            return new MovementAction(this.dx, this.dy).perform(entity);
        }
    }
}

export class LogAction implements Action {
    perform(_entity: Entity) {
        window.engine.state = EngineState.Log;
    }
}

export class ItemAction implements Action {
    constructor(public item: Item) {}

    perform(entity: Entity) {
        this.item.consumable.activate(this, entity);
    }
}

export class PickupAction implements Action {
    perform(entity: Entity) {
        const consumer = entity as Actor;
        if (!consumer) return;

        const { x, y, inventory } = consumer;

        for (const item of window.engine.gameMap.items) {
            if (x === item.x && y == item.y) {
                if (inventory.items.length >= inventory.capacity) {
                    window.engine.messageLog.addMessage(
                        "Your inventory is full.",
                        Colors.Impossible
                    );
                    throw new Error("Your inventory is full.");
                }

                window.engine.gameMap.removeEntity(item);
                item.parent = inventory;
                inventory.items.push(item);

                window.engine.messageLog.addMessage(
                    `You picked up the ${item.name}!`
                );

                return;
            }
        }

        window.engine.messageLog.addMessage(
            "There is nothing here to pick up.",
            Colors.Impossible
        );

        throw new Error("There is nothing here to pick up.");
    }
}

export class InventoryAction implements Action {
    constructor(public isUsing: boolean) {}

    perform(_entity: Entity) {
        window.engine.state = this.isUsing
            ? EngineState.UseInventory
            : EngineState.DropInventory;
    }
}

class DropItem extends ItemAction {
    perform(entity: Entity) {
        const dropper = entity as Actor;

        if (!dropper) return;
        dropper.inventory.drop(this.item);
    }
}

export function handleInventoryInput(event: KeyboardEvent): Action | null {
    let action = null;

    if (event.key.length === 1) {
        const ordinal = event.key.charCodeAt(0);
        const index = ordinal - "a".charCodeAt(0);

        if (index >= 0 && index <= 26) {
            const item = window.engine.player.inventory.items[index];

            if (item) {
                if (window.engine.state === EngineState.UseInventory) {
                    action = item.consumable.getAction();
                } else if (window.engine.state === EngineState.DropInventory) {
                    action = new DropItem(item);
                }
            } else {
                window.engine.messageLog.addMessage(
                    "Invalid entry.",
                    Colors.Invalid
                );
                return null;
            }
        }
    }

    window.engine.state = EngineState.Game;
    return action;
}

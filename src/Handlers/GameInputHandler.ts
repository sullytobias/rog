import { Base as BaseAction } from "../Movement/Actions/Base";
import { BumpAction } from "../Movement/Actions/BumpAction";
import { PickupAction } from "../Movement/Actions/PickupAction";
import { TakeStairsAction } from "../Movement/Actions/TakeStairsAction";
import { WaitAction } from "../Movement/Actions/WaitAction";

import { InputState } from "../State/State";

import { BaseInputHandler, MOVE_KEYS } from "./Base";
import { CharacterScreenInputHandler } from "./CharacterScreenInputHandler";
import { InventoryInputHandler } from "./InventoryInputHandler";
import { LevelUpEventHandler } from "./LevelUpEventHandler";
import { LogInputHandler } from "./LogInputHandler";
import { LookHandler } from "./LookHandler";

export class GameInputHandler extends BaseInputHandler {
    constructor() {
        super();
    }

    handleKeyboardInput(event: KeyboardEvent): BaseAction | null {
        if (window.engine.player.fighter.hp > 0) {
            if (window.engine.player.level.requiresLevelUp) {
                this.nextHandler = new LevelUpEventHandler();
                return null;
            }

            if (event.key in MOVE_KEYS) {
                const [dx, dy] = MOVE_KEYS[event.key];
                return new BumpAction(dx, dy);
            }

            if (event.key === "v") {
                this.nextHandler = new LogInputHandler();
            }

            if (event.key === "5" || event.key === ".") {
                return new WaitAction();
            }

            if (event.key === "g") {
                return new PickupAction();
            }

            if (event.key === "i") {
                this.nextHandler = new InventoryInputHandler(
                    InputState.UseInventory
                );
            }

            if (event.key === "d") {
                this.nextHandler = new InventoryInputHandler(
                    InputState.DropInventory
                );
            }

            if (event.key === "c") {
                this.nextHandler = new CharacterScreenInputHandler();
            }

            if (event.key === "/") {
                this.nextHandler = new LookHandler();
            }

            if (event.key === ">") {
                return new TakeStairsAction();
            }
        }

        return null;
    }
}

import { Display } from "rot-js";

import { Colors } from "../Colors/Colors";

import { DropItemAction } from "../Movement/Actions/DropItemAction";
import { EquipAction } from "../Movement/Actions/EquipAction";
import { Base as BaseAction } from "../Movement/Actions/Base";

import { BaseInputHandler } from "./Base";
import { GameInputHandler } from "./GameInputHandler";

import { InputState } from "../State/State";

import { renderFrameWithTitle } from "../Ui/Renders/renderFrameWithTitle";

export class InventoryInputHandler extends BaseInputHandler {
    constructor(inputState: InputState) {
        super(inputState);
    }

    onRender(display: Display) {
        const title =
            this.inputState === InputState.UseInventory
                ? "Select an item to use"
                : "Select an item to drop";
        const itemCount = window.engine.player.inventory.items.length;
        const height = itemCount + 2 <= 3 ? 3 : itemCount + 2;
        const width = title.length + 4;
        const x = window.engine.player.x <= 30 ? 40 : 0;
        const y = 0;

        renderFrameWithTitle(x, y, width, height, title);

        if (itemCount > 0) {
            window.engine.player.inventory.items.forEach((i, index) => {
                const key = String.fromCharCode("a".charCodeAt(0) + index);
                const isEquipped =
                    window.engine.player.equipment.itemIsEquipped(i);
                let itemString = `(${key}) ${i.name}`;
                itemString = isEquipped ? `${itemString} (E)` : itemString;
                display.drawText(x + 1, y + index + 1, itemString);
            });
        } else {
            display.drawText(x + 1, y + 1, "(Empty)");
        }
    }

    handleKeyboardInput(event: KeyboardEvent): BaseAction | null {
        if (event.key.length === 1) {
            const ordinal = event.key.charCodeAt(0);
            const index = ordinal - "a".charCodeAt(0);

            if (index >= 0 && index <= 26) {
                const item = window.engine.player.inventory.items[index];

                if (item) {
                    this.nextHandler = new GameInputHandler();
                    if (this.inputState === InputState.UseInventory) {
                        if (item.consumable) {
                            return item.consumable.getAction();
                        } else if (item.equippable) {
                            return new EquipAction(item);
                        }
                        return null;
                    } else if (this.inputState === InputState.DropInventory) {
                        return new DropItemAction(item);
                    }
                } else {
                    window.messageLog.addMessage(
                        "Invalid entry.",
                        Colors.Invalid
                    );
                    return null;
                }
            }
        }
        this.nextHandler = new GameInputHandler();
        return null;
    }
}

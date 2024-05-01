import { Display } from "rot-js";

import { Colors } from "../Colors/Colors";

import { BaseInputHandler } from "./Base";

import { GameInputHandler } from "./GameInputHandler";

import { Base as BaseAction } from "../Movement/Actions/Base";

import { renderFrameWithTitle } from "../Ui/Renders/renderFrameWithTitle";

export class LevelUpEventHandler extends BaseInputHandler {
    constructor() {
        super();
    }

    onRender(display: Display) {
        let x = 0;

        if (window.engine.player.x <= 30) {
            x = 40;
        }

        renderFrameWithTitle(x, 0, 35, 8, "Level Up");

        display.drawText(x + 1, 1, "Congratulations! You level up!");
        display.drawText(x + 1, 2, "Select and attribute to increase.");

        display.drawText(
            x + 1,
            4,
            `a) Constitution (+20 HP, from ${window.engine.player.fighter.maxHp})`
        );

        display.drawText(
            x + 1,
            5,
            `b) Strength (+1 attack, from ${window.engine.player.fighter.power})`
        );

        display.drawText(
            x + 1,
            6,
            `c) Agility (+1 defense, from ${window.engine.player.fighter.defense})`
        );
    }

    handleKeyboardInput(event: KeyboardEvent): BaseAction | null {
        if (event.key === "a") {
            window.engine.player.level.increaseMaxHp();
        } else if (event.key === "b") {
            window.engine.player.level.increasePower();
        } else if (event.key === "c") {
            window.engine.player.level.increaseDefense();
        } else {
            window.messageLog.addMessage("Invalid entry.", Colors.Invalid);
            return null;
        }

        this.nextHandler = new GameInputHandler();
        return null;
    }
}

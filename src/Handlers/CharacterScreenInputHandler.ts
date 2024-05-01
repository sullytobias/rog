import { Display } from "rot-js";

import { BaseInputHandler } from "./Base";

import { GameInputHandler } from "./GameInputHandler";

import { Base as BaseAction } from "../Movement/Actions/Base";

import { renderFrameWithTitle } from "../Ui/Renders/renderFrameWithTitle";

export class CharacterScreenInputHandler extends BaseInputHandler {
    constructor() {
        super();
    }

    onRender(display: Display) {
        const x = window.engine.player.x <= 30 ? 40 : 0;
        const y = 0;
        const title = "Character Information";
        const width = title.length + 4;

        renderFrameWithTitle(x, y, width, 7, title);

        display.drawText(
            x + 1,
            y + 1,
            `Level: ${window.engine.player.level.currentLevel}`
        );
        display.drawText(
            x + 1,
            y + 2,
            `XP: ${window.engine.player.level.currentXp}`
        );
        display.drawText(
            x + 1,
            y + 3,
            `XP for next Level: ${window.engine.player.level.experienceToNextLevel}`
        );
        display.drawText(
            x + 1,
            y + 4,
            `Attack: ${window.engine.player.fighter.power}`
        );
        display.drawText(
            x + 1,
            y + 5,
            `Defense: ${window.engine.player.fighter.defense}`
        );
    }

    handleKeyboardInput(_event: KeyboardEvent): BaseAction | null {
        this.nextHandler = new GameInputHandler();
        return null;
    }
}

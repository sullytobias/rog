import { Engine } from "../Engine/Engine";

import { Base as BaseAction } from "../Movement/Actions/Base";

import { InputState } from "../State/State";

import { BaseInputHandler, MOVE_KEYS } from "./Base";
import { GameInputHandler } from "./GameInputHandler";

export abstract class SelectIndexHandler extends BaseInputHandler {
    protected constructor() {
        super(InputState.Target);
        const { x, y } = window.engine.player;
        this.mousePosition = [x, y];
    }

    handleKeyboardInput(event: KeyboardEvent): BaseAction | null {
        if (event.key in MOVE_KEYS) {
            const moveAmount = MOVE_KEYS[event.key];
            let modifier = 1;
            if (event.shiftKey) modifier = 5;
            if (event.ctrlKey) modifier = 10;
            if (event.altKey) modifier = 20;

            let [x, y] = this.mousePosition;
            const [dx, dy] = moveAmount;
            x += dx * modifier;
            y += dy * modifier;
            x = Math.max(0, Math.min(x, Engine.MAP_WIDTH - 1));
            y = Math.max(0, Math.min(y, Engine.MAP_HEIGHT - 1));
            this.mousePosition = [x, y];
            return null;
        } else if (event.key === "Enter") {
            let [x, y] = this.mousePosition;
            return this.onIndexSelected(x, y);
        }

        this.nextHandler = new GameInputHandler();
        return null;
    }

    abstract onIndexSelected(x: number, y: number): BaseAction | null;
}

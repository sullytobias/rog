import { Display } from "rot-js";

import { Base as BaseAction } from "../Movement/Actions/Base";

import { GameInputHandler } from "./GameInputHandler";
import { SelectIndexHandler } from "./SelectIndexHandler";
import { ActionCallback } from "./Types";

export class AreaRangedAttackHandler extends SelectIndexHandler {
    constructor(public radius: number, public callback: ActionCallback) {
        super();
    }

    onRender(display: Display) {
        const startX = this.mousePosition[0] - this.radius - 1;
        const startY = this.mousePosition[1] - this.radius - 1;

        for (let x = startX; x < startX + this.radius ** 2; x++) {
            for (let y = startY; y < startY + this.radius ** 2; y++) {
                display.drawOver(x, y, null, "#fff", "#f00");
            }
        }
    }

    onIndexSelected(x: number, y: number): BaseAction | null {
        this.nextHandler = new GameInputHandler();
        return this.callback(x, y);
    }
}

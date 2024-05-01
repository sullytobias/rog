import { ActionCallback } from "./Types";
import { GameInputHandler } from "./GameInputHandler";
import { SelectIndexHandler } from "./SelectIndexHandler";

import { Base as BaseAction } from "../Movement/Actions/Base";

export class SingleRangedAttackHandler extends SelectIndexHandler {
    constructor(public callback: ActionCallback) {
        super();
    }

    onIndexSelected(x: number, y: number): BaseAction | null {
        this.nextHandler = new GameInputHandler();
        return this.callback(x, y);
    }
}

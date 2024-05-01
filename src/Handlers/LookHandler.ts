import { GameInputHandler } from "./GameInputHandler";
import { SelectIndexHandler } from "./SelectIndexHandler";

import { Base as BaseAction } from "../Movement/Actions/Base";

export class LookHandler extends SelectIndexHandler {
    constructor() {
        super();
    }

    onIndexSelected(_x: number, _y: number): BaseAction | null {
        this.nextHandler = new GameInputHandler();
        return null;
    }
}

import { LogAction } from "../Movement/Actions/LogAction";
import { Base as BaseAction } from "../Movement/Actions/Base";

import { BaseInputHandler } from "./Base";
import { GameInputHandler } from "./GameInputHandler";

import { InputState } from "../State/State";

interface LogMap {
    [key: string]: number;
}

const LOG_KEYS: LogMap = {
    ArrowUp: -1,
    ArrowDown: 1,
};

export class LogInputHandler extends BaseInputHandler {
    constructor() {
        super(InputState.Log);
    }

    handleKeyboardInput(event: KeyboardEvent): BaseAction | null {
        if (event.key === "Home") {
            return new LogAction(() => (this.logCursorPosition = 0));
        }
        if (event.key === "End") {
            return new LogAction(
                () =>
                    (this.logCursorPosition =
                        window.messageLog.messages.length - 1)
            );
        }

        const scrollAmount = LOG_KEYS[event.key];
        if (!scrollAmount) {
            this.nextHandler = new GameInputHandler();
        }

        return new LogAction(() => {
            if (scrollAmount < 0 && this.logCursorPosition === 0) {
                this.logCursorPosition = window.messageLog.messages.length - 1;
            } else if (
                scrollAmount > 0 &&
                this.logCursorPosition === window.messageLog.messages.length - 1
            ) {
                this.logCursorPosition = 0;
            } else {
                this.logCursorPosition = Math.max(
                    0,
                    Math.min(
                        this.logCursorPosition + scrollAmount,
                        window.messageLog.messages.length - 1
                    )
                );
            }
        });
    }
}

import { EngineState } from "../Engine/Engine";
import { MOVE_KEYS } from "./constants";
import { Action } from "./interfaces";

interface LogMap {
    [key: string]: number;
}
const LOG_KEYS: LogMap = {
    ArrowUp: -1,
    ArrowDown: 1,
    PageDown: 10,
    PageUp: -1,
};

export function handleGameInput(event: KeyboardEvent): Action {
    return MOVE_KEYS[event.key];
}

export function handleLogInput(event: KeyboardEvent): number {
    if (event.key === "Home") {
        window.engine.logCursorPosition = 0;
        return 0;
    }

    if (event.key === "End") {
        window.engine.logCursorPosition =
            window.engine.messageLog.messages.length - 1;
        return 0;
    }

    const scrollAmount = LOG_KEYS[event.key];

    if (!scrollAmount) {
        window.engine.state = EngineState.Game;
        return 0;
    }

    return scrollAmount;
}

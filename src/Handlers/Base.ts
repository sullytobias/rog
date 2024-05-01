import { Display } from "rot-js";

import { Base as BaseAction } from "../Movement/Actions/Base";

import { InputState } from "../State/State";

interface DirectionMap {
    [key: string]: [number, number];
}

export const MOVE_KEYS: DirectionMap = {
    // Arrow Keys
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    Home: [-1, -1],
    End: [-1, 1],
    PageUp: [1, -1],
    PageDown: [1, 1],
    // Numpad Keys
    1: [-1, 1],
    2: [0, 1],
    3: [1, 1],
    4: [-1, 0],
    6: [1, 0],
    7: [-1, -1],
    8: [0, -1],
    9: [1, -1],
    // Vi keys
    h: [-1, 0],
    j: [0, 1],
    k: [0, -1],
    l: [1, 0],
    y: [-1, -1],
    u: [1, -1],
    b: [-1, 1],
    n: [1, 1],
};

export abstract class BaseInputHandler {
    nextHandler: BaseInputHandler;
    mousePosition: [number, number];
    logCursorPosition: number;

    protected constructor(public inputState: InputState = InputState.Game) {
        this.nextHandler = this;
        this.mousePosition = [0, 0];
        this.logCursorPosition = window.messageLog.messages.length - 1;
    }

    handleMouseMovement(position: [number, number]) {
        this.mousePosition = position;
    }

    onRender(_display: Display) {}

    abstract handleKeyboardInput(event: KeyboardEvent): BaseAction | null;
}

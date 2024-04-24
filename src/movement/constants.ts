import { BumpAction, WaitAction } from "./inputHandler";
import { MovementMap } from "./interfaces";

export const MOVE_KEYS: MovementMap = {
    // Arrow Keys
    ArrowUp: new BumpAction(0, -1),
    ArrowDown: new BumpAction(0, 1),
    ArrowLeft: new BumpAction(-1, 0),
    ArrowRight: new BumpAction(1, 0),
    Home: new BumpAction(-1, -1),
    End: new BumpAction(-1, 1),
    PageUp: new BumpAction(1, -1),
    PageDown: new BumpAction(1, 1),
    // Numpad Keys
    1: new BumpAction(-1, 1),
    2: new BumpAction(0, 1),
    3: new BumpAction(1, 1),
    4: new BumpAction(-1, 0),
    6: new BumpAction(1, 0),
    7: new BumpAction(-1, -1),
    8: new BumpAction(0, -1),
    9: new BumpAction(1, -1),
    // Vi keys
    h: new BumpAction(-1, 0),
    j: new BumpAction(0, 1),
    k: new BumpAction(0, -1),
    l: new BumpAction(1, 0),
    y: new BumpAction(-1, -1),
    u: new BumpAction(1, -1),
    b: new BumpAction(-1, 1),
    n: new BumpAction(1, 1),
    // Wait keys
    5: new WaitAction(),
    Period: new WaitAction(),
};

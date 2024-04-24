import { BumpAction } from "./inputHandler";
import { MovementMap } from "./interfaces";

export const MOVE_KEYS: MovementMap = {
    ArrowUp: new BumpAction(0, -1),
    ArrowDown: new BumpAction(0, 1),
    ArrowLeft: new BumpAction(-1, 0),
    ArrowRight: new BumpAction(1, 0),
};

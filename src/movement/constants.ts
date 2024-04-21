import { MovementAction } from "./inputHandler";
import { MovementMap } from "./interfaces";

export const MOVE_KEYS: MovementMap = {
    ArrowUp: new MovementAction(0, -1),
    ArrowDown: new MovementAction(0, 1),
    ArrowLeft: new MovementAction(-1, 0),
    ArrowRight: new MovementAction(1, 0),
};

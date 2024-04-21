import { MOVE_KEYS } from "./constants";
import { Action } from "./interfaces";

export const handleInput = (event: KeyboardEvent): Action =>
    MOVE_KEYS[event.key];

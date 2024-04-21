import { Action } from "./interfaces";

export class MovementAction implements Action {
    dx: number;
    dy: number;

    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }
}

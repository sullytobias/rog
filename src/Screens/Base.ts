import { Display } from "rot-js";

import { BaseInputHandler } from "./Handlers";

import { Actor } from "../Entity/Actor";

export abstract class Base {
    abstract inputHandler: BaseInputHandler;
    protected constructor(public display: Display, public player: Actor) {}

    abstract update(event: KeyboardEvent): Base;

    generateFloor() {}

    abstract render(): void;
}

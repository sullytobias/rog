import { Display } from "rot-js";

import { Actor } from "../Entity/Actor";

import { BaseInputHandler } from "../Handlers/Base";

export abstract class Base {
    abstract inputHandler: BaseInputHandler;
    protected constructor(public display: Display, public player: Actor) {}

    abstract update(event: KeyboardEvent): Base;

    generateFloor() {}

    abstract render(): void;
}

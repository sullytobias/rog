import { Display } from "rot-js";
import { Actor } from "../Entity/Entity";
import { BaseInputHandler } from "../movement/handlerFunctions";

export abstract class BaseScreen {
    abstract inputHandler: BaseInputHandler;

    protected constructor(public display: Display, public player: Actor) {}

    abstract update(event: KeyboardEvent): BaseScreen;

    abstract render(): void;
}

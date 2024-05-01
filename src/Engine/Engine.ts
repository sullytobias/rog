import * as ROT from "rot-js";

import { BaseInputHandler, GameInputHandler } from "../Screens/Handlers";
import { Base } from "../Screens/Base";
import { MainMenu } from "../Screens/MainMenu";

import { spawnPlayer } from "../Entity/Spawns/Actors/Player";
import { Actor } from "../Entity/Actor";

export class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;
    public static readonly MAP_WIDTH = 80;
    public static readonly MAP_HEIGHT = 43;

    display: ROT.Display;
    inputHandler: BaseInputHandler;
    screen: Base;
    player: Actor;

    constructor() {
        this.display = new ROT.Display({
            width: Engine.WIDTH,
            height: Engine.HEIGHT,
            forceSquareRatio: true,
        });

        this.player = spawnPlayer(
            Math.floor(Engine.MAP_WIDTH / 2),
            Math.floor(Engine.MAP_HEIGHT / 2)
        );

        this.screen = new MainMenu(this.display, this.player);

        const container = this.display.getContainer()!;
        document.body.appendChild(container);

        this.inputHandler = new GameInputHandler();

        window.addEventListener("keydown", (event) => {
            this.update(event);
        });

        window.addEventListener("mousemove", (event) => {
            this.inputHandler.handleMouseMovement(
                this.display.eventToPosition(event)
            );
            this.screen.render();
        });

        this.screen = new MainMenu(this.display, this.player);
    }

    update(event: KeyboardEvent) {
        const screen = this.screen.update(event);

        if (!Object.is(screen, this.screen)) {
            this.screen = screen;
            this.screen.render();
        }
    }
}

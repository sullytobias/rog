import * as ROT from "rot-js";

import { Actor } from "../Entity/Entity";

import {
    BaseInputHandler,
    GameInputHandler,
} from "../movement/handlerFunctions";
import { spawnPlayer } from "../Entity/SpawnHelpers";
import { BaseScreen } from "../Screens/Base";
import { GameScreen } from "../Screens/GameScreen";
import { MainMenu } from "../Screens/MainMenu";

export class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;
    public static readonly MAP_WIDTH = 80;
    public static readonly MAP_HEIGHT = 43;

    display: ROT.Display;
    inputHandler: BaseInputHandler;
    screen: BaseScreen;
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

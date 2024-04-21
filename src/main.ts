import * as ROT from "rot-js";

import { MovementAction } from "./movement/inputHandler";
import { handleInput } from "./movement/handlerFunctions";
import { GameMap } from "./map/Map";

class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;

    display: ROT.Display;

    gameMap: GameMap;

    playerX: number;
    playerY: number;

    constructor() {
        this.display = new ROT.Display({
            width: Engine.WIDTH,
            height: Engine.HEIGHT,
            fontSize: 18,
        });

        this.playerX = Engine.WIDTH / 2;
        this.playerY = Engine.HEIGHT / 2;

        const container = this.display.getContainer()!;

        document.body.appendChild(container);

        this.gameMap = new GameMap(Engine.WIDTH, Engine.HEIGHT, this.display);

        window.addEventListener("keydown", (event) => {
            this.update(event);
        });

        this.render();
    }

    render() {
        this.gameMap.render();
        this.display.draw(this.playerX, this.playerY, "@", "#fff", "#000");
    }

    update(event: KeyboardEvent) {
        this.display.clear();

        const action = handleInput(event);

        if (action instanceof MovementAction) {
            this.playerX += action.dx;
            this.playerY += action.dy;
        }

        this.render();
    }
}

declare global {
    interface Window {
        engine: Engine;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.engine = new Engine();
});

import * as ROT from "rot-js";

import { handleInput } from "../movement/handlerFunctions";
import { Entity } from "../Entity/Entity";
import { GameMap } from "../Map/Map";
import { generateDungeon } from "../Map/Generation/Generation";

export class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;

    display: ROT.Display;

    player: Entity;
    entities: Entity[];

    gameMap: GameMap;

    constructor(entities: Entity[], player: Entity) {
        this.display = new ROT.Display({
            width: Engine.WIDTH,
            height: Engine.HEIGHT,
            forceSquareRatio: true,
            fontSize: 18,
        });

        this.entities = entities;
        this.player = player;

        const container = this.display.getContainer()!;

        document.body.appendChild(container);

        this.gameMap = generateDungeon(
            Engine.WIDTH,
            Engine.HEIGHT,
            5,
            5,
            20,
            this.player,
            this.display
        );

        window.addEventListener("keydown", (event) => {
            this.update(event);
        });

        this.render();
    }

    update(event: KeyboardEvent) {
        this.display.clear();

        const action = handleInput(event);

        if (action) action.perform(this, this.player);

        this.render();
    }

    render() {
        this.gameMap.render();

        this.entities.forEach((e) => {
            this.display.draw(e.x, e.y, e.char, e.fg, e.bg);
        });
    }
}

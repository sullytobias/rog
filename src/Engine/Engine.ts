import * as ROT from "rot-js";

import { handleInput } from "../movement/handlerFunctions";
import { Entity } from "../Entity/Entity";
import { GameMap } from "../Map/Map";
import { generateDungeon } from "../Map/Generation/Generation";

export class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;

    public static readonly MAX_MONSTERS_PER_ROOM = 2;

    display: ROT.Display;

    player: Entity;

    gameMap: GameMap;

    constructor(player: Entity) {
        this.display = new ROT.Display({
            width: Engine.WIDTH,
            height: Engine.HEIGHT,
            forceSquareRatio: true,
            fontSize: 18,
        });

        this.player = player;

        const container = this.display.getContainer()!;

        document.body.appendChild(container);

        this.gameMap = generateDungeon(
            Engine.WIDTH,
            Engine.HEIGHT,
            5,
            5,
            20,
            Engine.MAX_MONSTERS_PER_ROOM,
            this.player,
            this.display
        );

        window.addEventListener("keydown", (event) => {
            this.update(event);
        });

        this.gameMap.updateFov(this.player);
        this.render();
    }

    handleEnemyTurns() {
        this.gameMap.nonPlayerEntities.forEach((e) => {
            console.log(
                `The ${e.name} wonders when it will get to take a real turn.`
            );
        });
    }

    update(event: KeyboardEvent) {
        this.display.clear();

        const action = handleInput(event);

        if (action) action.perform(this, this.player);

        this.handleEnemyTurns();
        this.gameMap.updateFov(this.player);
        this.render();
    }

    render() {
        this.gameMap.render();
    }
}

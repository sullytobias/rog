import * as ROT from "rot-js";

import { handleInput } from "../movement/handlerFunctions";
import { Actor, Entity } from "../Entity/Entity";
import { GameMap } from "../Map/Map";
import { generateDungeon } from "../Map/Generation/Generation";

export class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;

    public static readonly MAX_MONSTERS_PER_ROOM = 2;

    display: ROT.Display;

    gameMap: GameMap;

    constructor(public player: Actor) {
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
        this.gameMap.actors.forEach((e) => {
            if (e.isAlive) {
                e.ai?.perform(e);
            }
        });
    }

    update(event: KeyboardEvent) {
        this.display.clear();

        if (this.player.fighter.hp > 0) {
            const action = handleInput(event);

            if (action) {
                action.perform(this.player);
            }

            this.handleEnemyTurns();
        }

        this.gameMap.updateFov(this.player);
        this.render();
    }

    render() {
        this.display.drawText(
            1,
            47,
            `HP: %c{red}%b{white}${this.player.fighter.hp}/%c{green}%b{white}${this.player.fighter.maxHp}`
        );

        this.gameMap.render();
    }
}

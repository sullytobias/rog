import * as ROT from "rot-js";

import { Actor } from "../Entity/Entity";
import { GameMap } from "../Map/Map";
import { generateDungeon } from "../Map/Generation/Generation";
import {
    renderFrameWithTitle,
    renderHealthBar,
    renderNamesAtLocation,
} from "../Ui/Render";
import { MessageLog } from "../Ui/MessageLog";
import { Colors } from "../Colors/Colors";
import {
    BaseInputHandler,
    GameInputHandler,
    InputState,
} from "../movement/handlerFunctions";
import { Action } from "../movement/Actions";

export class Engine {
    public static readonly WIDTH = 80;
    public static readonly HEIGHT = 50;

    public static readonly MAP_WIDTH = 80;
    public static readonly MAP_HEIGHT = 43;

    public static readonly MAX_MONSTERS_PER_ROOM = 2;

    public static readonly MAX_ITEMS_PER_ROOM = 2;

    display: ROT.Display;

    gameMap: GameMap;

    messageLog: MessageLog;
    mousePosition: [number, number];

    logCursorPosition: number;

    inputHandler: BaseInputHandler;

    constructor(public player: Actor) {
        this.display = new ROT.Display({
            width: Engine.WIDTH,
            height: Engine.HEIGHT,
            forceSquareRatio: true,
            fontSize: 18,
        });

        this.mousePosition = [0, 0];

        const container = this.display.getContainer()!;

        this.logCursorPosition = 0;

        document.body.appendChild(container);

        this.messageLog = new MessageLog();
        this.messageLog.addMessage(
            "Hello and welcome, adventurer, to yet another dungeon!",
            Colors.WelcomeText
        );

        this.inputHandler = new GameInputHandler();

        this.gameMap = generateDungeon(
            Engine.MAP_WIDTH,
            Engine.MAP_HEIGHT,
            5,
            5,
            20,
            Engine.MAX_MONSTERS_PER_ROOM,
            Engine.MAX_ITEMS_PER_ROOM,
            this.player,
            this.display
        );

        window.addEventListener("mousemove", (event) => {
            this.mousePosition = this.display.eventToPosition(event);
            this.render();
        });

        window.addEventListener("keydown", (event) => {
            this.update(event);
        });

        this.gameMap.updateFov(this.player);
    }

    handleEnemyTurns() {
        this.gameMap.actors.forEach((e) => {
            if (e.isAlive) {
                try {
                    e.ai?.perform(e);
                } catch {}
            }
        });
    }

    renderInventory(title: string) {
        const itemCount = this.player.inventory.items.length;
        const height = itemCount + 2 <= 3 ? 3 : itemCount + 2;
        const width = title.length + 4;
        const x = this.player.x <= 30 ? 40 : 0;
        const y = 0;

        renderFrameWithTitle(x, y, width, height, title);

        if (itemCount > 0) {
            this.player.inventory.items.forEach((i, index) => {
                const key = String.fromCharCode("a".charCodeAt(0) + index);
                this.display.drawText(
                    x + 1,
                    y + index + 1,
                    `(${key}) ${i.name}`
                );
            });
        } else {
            this.display.drawText(x + 1, y + 1, "(Empty)");
        }
    }

    update(event: KeyboardEvent) {
        const action = this.inputHandler.handleKeyboardInput(event);

        if (action) {
            try {
                action.perform(this.player);
                this.handleEnemyTurns();
                this.gameMap.updateFov(this.player);
            } catch {}
        }

        this.inputHandler = this.inputHandler.nextHandler;

        this.render();
    }

    render() {
        this.display.clear();
        this.messageLog.render(this.display, 21, 45, 40, 5);
        renderHealthBar(
            this.display,
            this.player.fighter.hp,
            this.player.fighter.maxHp,
            20
        );
        renderNamesAtLocation(21, 44);

        this.gameMap.render();

        if (this.inputHandler.inputState === InputState.Log) {
            renderFrameWithTitle(3, 3, 74, 38, "Message History");
            this.messageLog.renderMessages(
                this.display,
                4,
                4,
                72,
                36,
                this.messageLog.messages.slice(0, this.logCursorPosition + 1)
            );
        }
        if (this.inputHandler.inputState === InputState.UseInventory) {
            this.renderInventory("Select an item to use");
        }
        if (this.inputHandler.inputState === InputState.DropInventory) {
            this.renderInventory("Select an item to drop");
        }
    }
}

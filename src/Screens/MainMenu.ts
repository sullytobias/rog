import { Display } from "rot-js";
import { Actor } from "../Entity/Entity";
import {
    BaseInputHandler,
    GameInputHandler,
} from "../movement/handlerFunctions";
import { BaseScreen } from "./Base";
import { GameScreen } from "./GameScreen";
import { Engine } from "../Engine/Engine";
import { renderFrameWithTitle } from "../Ui/Render";

const OPTIONS = ["[N] Play a new game"];

if (localStorage.getItem("roguesave")) {
    OPTIONS.push("[C] Continue last game");
}

const MENU_WIDTH = 24;

export class MainMenu extends BaseScreen {
    inputHandler: BaseInputHandler;
    showPopup: boolean;

    constructor(display: Display, player: Actor) {
        super(display, player);
        this.inputHandler = new GameInputHandler();
        this.showPopup = false;
    }

    update(event: KeyboardEvent): BaseScreen {
        if (this.showPopup) {
            this.showPopup = false;
        } else {
            if (event.key === "n") {
                return new GameScreen(this.display, this.player);
            } else if (event.key === "c") {
                try {
                    const saveGame = localStorage.getItem("roguesave");
                    return new GameScreen(this.display, this.player, saveGame);
                } catch {
                    this.showPopup = true;
                }
            }
        }

        this.render();
        return this;
    }

    render() {
        this.display.clear();
        OPTIONS.forEach((o, i) => {
            const x = Math.floor(Engine.WIDTH / 2);
            const y = Math.floor(Engine.HEIGHT / 2 - 1 + i);

            this.display.draw(x, y, o.padEnd(MENU_WIDTH, " "), "#fff", "#000");
        });

        if (this.showPopup) {
            const text = "Failed to load save.";
            const options = this.display.getOptions();
            const width = text.length + 4;
            const height = 7;
            const x = options.width / 2 - Math.floor(width / 2);
            const y = options.height / 2 - Math.floor(height / 2);

            renderFrameWithTitle(x, y, width, height, "Error");

            this.display.drawText(x + 1, y + 3, text);
        }
    }
}

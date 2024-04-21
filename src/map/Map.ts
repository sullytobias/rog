import * as ROT from "rot-js";
import Digger from "rot-js/lib/map/digger";

export class GameMap {
    width: number;
    height: number;
    display: ROT.Display;

    map: Digger;

    constructor(width: number, height: number, display: ROT.Display) {
        this.width = width;
        this.height = height;
        this.display = display;

        this.map = new ROT.Map.Digger(this.width, this.height);
    }

    render() {
        this.map.create((x, y, wall) => {
            this.display.draw(
                x,
                y,
                wall ? "#" : ".",
                wall ? "grey" : "white",
                ""
            );
        });
    }
}

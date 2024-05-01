import { FLOOR_TILE } from "../../../Tiles/Floor_Tile";
import { Tile } from "../../../Tiles/Tile-types";
import { WALL_TILE } from "../../../Tiles/Wall_Tile";

import { Bounds } from "../Bounds";

export class RectangularRoom {
    tiles: Tile[][];

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
        this.tiles = new Array(this.height);

        this.buildRoom();
    }

    public get center(): [number, number] {
        const centerX = this.x + Math.floor(this.width / 2);
        const centerY = this.y + Math.floor(this.height / 2);

        return [centerX, centerY];
    }

    get bounds(): Bounds {
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width - 1,
            y2: this.y + this.height - 1,
        };
    }

    intersects(other: RectangularRoom): boolean {
        return (
            this.x <= other.x + other.width &&
            this.x + this.width >= other.x &&
            this.y <= other.y + other.height &&
            this.y + this.width >= other.y
        );
    }

    buildRoom() {
        for (let y = 0; y < this.height; y++) {
            const row = new Array(this.width);

            for (let x = 0; x < this.width; x++) {
                const isWall =
                    x === 0 ||
                    x === this.width - 1 ||
                    y === 0 ||
                    y === this.height - 1;

                row[x] = isWall ? { ...WALL_TILE } : { ...FLOOR_TILE };
            }

            this.tiles[y] = row;
        }
    }
}

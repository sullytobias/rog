import { Display, FOV } from "rot-js";

import { Base as BaseEntity } from "../Entity/Base";
import { Actor } from "../Entity/Actor";
import { Item } from "../Entity/Item";

import { Tile } from "../Tiles/Tile-types";
import { WALL_TILE } from "../Tiles/Wall_Tile";

export class GameMap {
    tiles: Tile[][];
    downstairsLocation: [number, number];

    constructor(
        public width: number,
        public height: number,
        public display: Display,
        public entities: BaseEntity[]
    ) {
        this.tiles = new Array(this.height);
        for (let y = 0; y < this.height; y++) {
            const row = new Array(this.width);
            for (let x = 0; x < this.width; x++) {
                row[x] = { ...WALL_TILE };
            }
            this.tiles[y] = row;
        }
        this.downstairsLocation = [0, 0];
    }

    public get nonPlayerEntities(): BaseEntity[] {
        return this.entities.filter((e) => e.name !== "Player");
    }

    public get actors(): Actor[] {
        return this.entities
            .filter((e) => e instanceof Actor)
            .map((e) => e as Actor)
            .filter((a) => a.isAlive);
    }

    public get items(): Item[] {
        return this.entities
            .filter((e) => e instanceof Item)
            .map((e) => e as Item);
    }

    public get gameMap(): GameMap {
        return this;
    }

    isInBounds(x: number, y: number) {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    }

    addRoom(x: number, y: number, roomTiles: Tile[][]) {
        for (let curY = y; curY < y + roomTiles.length; curY++) {
            const mapRow = this.tiles[curY];
            const roomRow = roomTiles[curY - y];

            for (let curX = x; curX < x + roomRow.length; curX++) {
                mapRow[curX] = roomRow[curX - x];
            }
        }
    }

    lightPasses(x: number, y: number): boolean {
        if (this.isInBounds(x, y)) return this.tiles[y][x].transparent;

        return false;
    }

    updateFov(player: BaseEntity) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x].visible = false;
            }
        }

        const fov = new FOV.PreciseShadowcasting(this.lightPasses.bind(this));

        fov.compute(player.x, player.y, 8, (x, y, _r, visibility) => {
            if (visibility === 1) {
                this.tiles[y][x].visible = true;
                this.tiles[y][x].seen = true;
            }
        });
    }

    getBlockingEntityAtLocation(x: number, y: number): BaseEntity | undefined {
        return this.entities.find(
            (e) => e.blocksMovement && e.x === x && e.y === y
        );
    }

    getActorAtLocation(x: number, y: number): Actor | undefined {
        return this.actors.find((a) => a.x === x && a.y === y);
    }

    removeEntity(entity: BaseEntity) {
        const index = this.entities.indexOf(entity);

        if (index >= 0) {
            this.entities.splice(index, 1);
        }
    }

    render() {
        for (let y = 0; y < this.tiles.length; y++) {
            const row = this.tiles[y];

            for (let x = 0; x < row.length; x++) {
                const tile = row[x];

                let char = " ";
                let fg = "#fff";
                let bg = "#000";

                if (tile.visible) {
                    char = tile.light.char;
                    fg = tile.light.fg;
                    bg = tile.light.bg;
                } else if (tile.seen) {
                    char = tile.dark.char;
                    fg = tile.dark.fg;
                    bg = tile.dark.bg;
                }

                this.display.draw(x, y, char, fg, bg);
            }
        }

        const sortedEntities = this.entities
            .slice()
            .sort((a, b) => a.renderOrder - b.renderOrder);

        sortedEntities.forEach((e) => {
            if (this.tiles[e.y][e.x].visible) {
                this.display.draw(e.x, e.y, e.char, e.fg, e.bg);
            }
        });
    }
}

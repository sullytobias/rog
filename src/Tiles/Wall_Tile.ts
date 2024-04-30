import { Tile } from "./Tile-types";

export const WALL_TILE: Tile = {
    walkable: false,
    transparent: false,
    visible: false,
    seen: false,
    dark: { char: " ", fg: "#fff", bg: "#2242c7" },
    light: { char: " ", fg: "#fff", bg: "#f9a825" },
};

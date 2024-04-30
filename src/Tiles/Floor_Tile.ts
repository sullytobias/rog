import { Tile } from "./Tile-types";

export const FLOOR_TILE: Tile = {
    walkable: true,
    transparent: true,
    visible: false,
    seen: false,
    dark: { char: " ", fg: "#fff", bg: "#3613b7" },
    light: { char: " ", fg: "#fff", bg: "#fff59d" },
};

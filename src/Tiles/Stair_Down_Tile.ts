import { Tile } from "./Tile-types";

export const STAIRS_DOWN_TILE: Tile = {
    walkable: true,
    transparent: true,
    visible: false,
    seen: false,
    dark: { char: ">", fg: "#000064", bg: "#323296" },
    light: { char: ">", fg: "#ffffff", bg: "#c8b432" },
};

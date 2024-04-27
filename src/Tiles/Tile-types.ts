export interface Graphic {
    char: string;
    fg: string;
    bg: string;
}

export interface Tile {
    walkable: boolean;
    transparent: boolean;
    visible: boolean;
    seen: boolean;
    dark: Graphic;
    light: Graphic;
}

export const FLOOR_TILE: Tile = {
    walkable: true,
    transparent: true,
    visible: false,
    seen: false,
    dark: { char: " ", fg: "#fff", bg: "#3613b7" },
    light: { char: " ", fg: "#fff", bg: "#fff59d" },
};

export const WALL_TILE: Tile = {
    walkable: false,
    transparent: false,
    visible: false,
    seen: false,
    dark: { char: " ", fg: "#fff", bg: "#2242c7" },
    light: { char: " ", fg: "#fff", bg: "#f9a825" },
};

export const STAIRS_DOWN_TILE: Tile = {
    walkable: true,
    transparent: true,
    visible: false,
    seen: false,
    dark: { char: ">", fg: "#000064", bg: "#323296" },
    light: { char: ">", fg: "#ffffff", bg: "#c8b432" },
};

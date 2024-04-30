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





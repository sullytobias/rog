import { GameMap } from "../../Map";

import { Base as BaseEntity } from "../../../Entity/Base";

export type WeightMap = {
    [key: string]: number;
};

export type Choice = {
    value: string;
    weight: number;
};

export type WeightedChoices = {
    floor: number;
    weights: Choice[];
};

export type FloorValue = [number, number][];

export type SPAWNMAP = {
    [key: string]: (gameMap: GameMap, x: number, y: number) => BaseEntity;
};

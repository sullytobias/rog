import { RNG } from "rot-js";

import { GameMap } from "../../Map";

import { generateRandomNumber } from "../Generators/generateRandomNumber";
import { getMaxValueForFloor } from "../Getters/getMaxValueForFloor";
import { getWeights } from "../Getters/getWeight";

import { WeightedChoices, FloorValue, SPAWNMAP } from "../Types/Types";

import { RectangularRoom } from "../Rooms/RectangularRoom";

import { spawnOrc } from "../../../Entity/Spawns/Actors/Orc";
import { spawnTroll } from "../../../Entity/Spawns/Actors/Troll";
import { spawnChainMail } from "../../../Entity/Spawns/Items/Armor/ChainMail";
import { spawnLeatherArmor } from "../../../Entity/Spawns/Items/Armor/LeatherArmor";
import { spawnHealthPotion } from "../../../Entity/Spawns/Items/Potions/HealthPotion";
import { spawnConfusionScroll } from "../../../Entity/Spawns/Items/Scroll/ConfusionScroll";
import { spawnFireballScroll } from "../../../Entity/Spawns/Items/Scroll/FireballScroll";
import { spawnLightningScroll } from "../../../Entity/Spawns/Items/Scroll/LightningScroll";
import { spawnDagger } from "../../../Entity/Spawns/Items/Weapons/Dagger";
import { spawnSword } from "../../../Entity/Spawns/Items/Weapons/Sword";

const spawnMap: SPAWNMAP = {
    spawnOrc,
    spawnTroll,
    spawnHealthPotion,
    spawnConfusionScroll,
    spawnLightningScroll,
    spawnFireballScroll,
    spawnDagger,
    spawnSword,
    spawnLeatherArmor,
    spawnChainMail,
};

const ITEM_CHANCES: WeightedChoices[] = [
    {
        floor: 0,
        weights: [{ value: "spawnHealthPotion", weight: 35 }],
    },
    {
        floor: 2,
        weights: [{ value: "spawnConfusionScroll", weight: 10 }],
    },
    {
        floor: 4,
        weights: [
            { value: "spawnLightningScroll", weight: 25 },
            { value: "spawnSword", weight: 5 },
        ],
    },
    {
        floor: 6,
        weights: [
            { value: "spawnFireballScroll", weight: 25 },
            { value: "spawnChainMail", weight: 15 },
        ],
    },
];

const MONSTER_CHANCES: WeightedChoices[] = [
    {
        floor: 0,
        weights: [{ value: "spawnOrc", weight: 80 }],
    },
    {
        floor: 3,
        weights: [{ value: "spawnTroll", weight: 15 }],
    },
    {
        floor: 5,
        weights: [{ value: "spawnTroll", weight: 30 }],
    },
    {
        floor: 7,
        weights: [{ value: "spawnTroll", weight: 60 }],
    },
];

const MAX_ITEMS_BY_FLOOR: FloorValue = [
    [1, 1],
    [4, 2],
];

const MAX_MONSTERS_BY_FLOOR: FloorValue = [
    [1, 2],
    [4, 3],
    [6, 5],
];

export function placeEntities(
    room: RectangularRoom,
    dungeon: GameMap,
    floorNumber: number
) {
    const numberOfMonstersToAdd = generateRandomNumber(
        0,
        getMaxValueForFloor(MAX_MONSTERS_BY_FLOOR, floorNumber)
    );
    const numberOfItemsToAdd = generateRandomNumber(
        0,
        getMaxValueForFloor(MAX_ITEMS_BY_FLOOR, floorNumber)
    );
    const bounds = room.bounds;

    for (let i = 0; i < numberOfMonstersToAdd; i++) {
        const x = generateRandomNumber(bounds.x1 + 1, bounds.x2 - 1);
        const y = generateRandomNumber(bounds.y1 + 1, bounds.y2 - 1);

        if (!dungeon.entities.some((e) => e.x == x && e.y == y)) {
            const weights = getWeights(MONSTER_CHANCES, floorNumber);
            const spawnType = RNG.getWeightedValue(weights);
            if (spawnType) {
                spawnMap[spawnType](dungeon, x, y);
            }
        }
    }

    for (let i = 0; i < numberOfItemsToAdd; i++) {
        const x = generateRandomNumber(bounds.x1 + 1, bounds.x2 - 1);
        const y = generateRandomNumber(bounds.y1 + 1, bounds.y2 - 1);

        if (!dungeon.entities.some((e) => e.x == x && e.y == y)) {
            const weights = getWeights(ITEM_CHANCES, floorNumber);
            const spawnType = RNG.getWeightedValue(weights);

            if (spawnType) {
                spawnMap[spawnType](dungeon, x, y);
            }
        }
    }
}

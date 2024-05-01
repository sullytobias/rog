import { WeightedChoices, WeightMap } from "../Types/Types";

export function getWeights(
    chancesByFloor: WeightedChoices[],
    floorNumber: number
): WeightMap {
    let current: WeightMap = {};

    for (let { floor, weights } of chancesByFloor) {
        if (floor > floorNumber) break;

        for (let { value, weight } of weights) {
            current[value] = weight;
        }
    }

    return current;
}

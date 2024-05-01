import { FloorValue } from "../Types/Types";

export function getMaxValueForFloor(
    maxValueByFloor: FloorValue,
    floor: number
): number {
    let current = 0;

    for (let [min, value] of maxValueByFloor) {
        if (min > floor) break;
        current = value;
    }

    return current;
}

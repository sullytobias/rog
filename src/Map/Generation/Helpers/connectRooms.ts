import { RectangularRoom } from "../Rooms/RectangularRoom";

export function* connectRooms(
    a: RectangularRoom,
    b: RectangularRoom
): Generator<[number, number], void, void> {
    // set the start point of our tunnel at the center of the first room
    let current = a.center;
    // set the end point at the center of the second room
    const end = b.center;

    // flip a coin to see if we go horizontally first or vertically
    let horizontal = Math.random() < 0.5;
    // set our axisIndex to 0 (x axis) if horizontal or 1 (y axis) if vertical
    let axisIndex = horizontal ? 0 : 1;

    // we'll loop until our current is the same as the end point
    while (current[0] !== end[0] || current[1] !== end[1]) {
        //are we tunneling in the positive or negative direction?

        // if direction is 0 we have hit the destination in one direction
        const direction = Math.sign(end[axisIndex] - current[axisIndex]);

        if (direction !== 0) {
            current[axisIndex] += direction;
            yield current;
        } else {
            // we've finished in this direction so switch to the other
            axisIndex = axisIndex === 0 ? 1 : 0;
            yield current;
        }
    }
}

import { GameMap } from "../../Map/Map";

export function renderNamesAtLocation(
    x: number,
    y: number,
    mousePosition: [number, number],
    gameMap: GameMap
) {
    const [mouseX, mouseY] = mousePosition;
    if (
        gameMap.isInBounds(mouseX, mouseY) &&
        gameMap.tiles[mouseY][mouseX].visible
    ) {
        const names = gameMap.entities
            .filter((e) => e.x === mouseX && e.y === mouseY)
            .map((e) => e.name.charAt(0).toUpperCase() + e.name.substring(1))
            .join(", ");

        window.engine.display.drawText(x, y, names);
    }
}

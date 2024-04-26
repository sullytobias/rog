import { Engine } from "./Engine/Engine";
import { spawnPlayer } from "./Entity/SpawnHelpers";

declare global {
    interface Window {
        engine: Engine;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.engine = new Engine(
        spawnPlayer(Engine.WIDTH / 2, Engine.HEIGHT / 2)
    );
    
    window.engine.render();
});

import { Colors } from "./Colors/Colors";
import { Engine } from "./Engine/Engine";
import { MessageLog } from "./Ui/MessageLog";

declare global {
    interface Window {
        engine: Engine;
        messageLog: MessageLog;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.messageLog = new MessageLog();
    window.engine = new Engine();
    window.messageLog.addMessage(
        "Hello and welcome, adventurer, to yet another dungeon!",
        Colors.WelcomeText
    );
    window.engine.screen.render();
});

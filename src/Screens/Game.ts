import { Display } from "rot-js";

import { Colors } from "../Colors/Colors";
import { ImpossibleException } from "../Exeptions/ImpossibleException";

import { GameMap } from "../Map/Map";
import { generateDungeon } from "../Map/Generation/Generators/generateDungeon";

import { Base as BaseAction } from "../Movement/Actions/Base";

import { Base } from "./Base";

import { Tile } from "../Tiles/Tile-types";

import { HostileEnemy, ConfusedEnemy } from "../Components/Ai";

import { spawnOrc } from "../Entity/Spawns/Actors/Orc";
import { spawnPlayer } from "../Entity/Spawns/Actors/Player";
import { spawnTroll } from "../Entity/Spawns/Actors/Troll";
import { spawnChainMail } from "../Entity/Spawns/Items/Armor/ChainMail";
import { spawnLeatherArmor } from "../Entity/Spawns/Items/Armor/LeatherArmor";
import { spawnHealthPotion } from "../Entity/Spawns/Items/Potions/HealthPotion";
import { spawnConfusionScroll } from "../Entity/Spawns/Items/Scroll/ConfusionScroll";
import { spawnFireballScroll } from "../Entity/Spawns/Items/Scroll/FireballScroll";
import { spawnLightningScroll } from "../Entity/Spawns/Items/Scroll/LightningScroll";
import { spawnDagger } from "../Entity/Spawns/Items/Weapons/Dagger";
import { spawnSword } from "../Entity/Spawns/Items/Weapons/Sword";
import { Actor } from "../Entity/Actor";
import { Item } from "../Entity/Item";

import { BaseInputHandler } from "../Handlers/Base";
import { GameInputHandler } from "../Handlers/GameInputHandler";

import { InputState } from "../State/State";

import { renderFrameWithTitle } from "../Ui/Renders/renderFrameWithTitle";
import { renderHealthBar } from "../Ui/Renders/renderHealthBar";
import { renderNamesAtLocation } from "../Ui/Renders/renderNamesAtLocation";

type SerializedEntity = {
    x: number;
    y: number;
    char: string;
    fg: string;
    bg: string;
    name: string;
    fighter: SerializedFighter | null;
    level: SerializedLevel | null;
    aiType: string | null;
    confusedTurnsRemaining: number;
    inventory: SerializedItem[] | null;
};

type SerializedLevel = {
    levelUpBase: number;
    xpGiven: number;
    currentLevel: number;
    currentXp: number;
    levelUpFactor: number;
};

type SerializedFighter = {
    maxHp: number;
    hp: number;
    defense: number;
    power: number;
};

type SerializedItem = {
    itemType: string;
};

type SerializedGameMap = {
    currentFloor: number;
    width: number;
    height: number;
    tiles: Tile[][];
    entities: SerializedEntity[];
};

export class Game extends Base {
    public static readonly MAP_WIDTH = 80;
    public static readonly MAP_HEIGHT = 43;
    public static readonly MIN_ROOM_SIZE = 6;
    public static readonly MAX_ROOM_SIZE = 10;
    public static readonly MAX_ROOMS = 30;

    gameMap!: GameMap;
    inputHandler: BaseInputHandler;

    constructor(
        display: Display,
        player: Actor,
        serializedGameMap: string | null = null,
        public currentFloor: number = 0
    ) {
        super(display, player);

        if (serializedGameMap) {
            const [map, loadedPlayer, floor] = Game.load(
                serializedGameMap,
                display
            );

            this.gameMap = map;
            this.player = loadedPlayer;
            this.currentFloor = floor;
        } else {
            this.generateFloor();
            const dagger = spawnDagger(this.gameMap, 0, 0);

            dagger.parent = this.player.inventory;

            this.player.inventory.items.push(dagger);
            this.player.equipment.toggleEquip(dagger, false);
            this.gameMap.removeEntity(dagger);

            const leatherArmor = spawnLeatherArmor(this.gameMap, 0, 0);

            leatherArmor.parent = this.player.inventory;

            this.player.inventory.items.push(leatherArmor);
            this.player.equipment.toggleEquip(leatherArmor, false);
            this.gameMap.removeEntity(leatherArmor);
        }

        this.inputHandler = new GameInputHandler();
        this.gameMap.updateFov(this.player);
    }

    private toObject(): SerializedGameMap {
        return {
            currentFloor: this.currentFloor,
            width: this.gameMap.width,
            height: this.gameMap.height,
            tiles: this.gameMap.tiles,
            entities: this.gameMap.entities.map((e) => {
                let fighter = null;
                let level = null;
                let aiType = null;
                let inventory = null;
                let confusedTurnsRemaining = 0;

                if (e instanceof Actor) {
                    const actor = e as Actor;
                    const { maxHp, _hp: hp, defense, power } = actor.fighter;
                    const {
                        currentXp,
                        currentLevel,
                        levelUpBase,
                        levelUpFactor,
                        xpGiven,
                    } = actor.level;

                    fighter = { maxHp, hp, defense, power };
                    level = {
                        currentXp,
                        currentLevel,
                        levelUpBase,
                        levelUpFactor,
                        xpGiven,
                    };

                    if (actor.ai) {
                        aiType =
                            actor.ai instanceof HostileEnemy
                                ? "hostile"
                                : "confused";
                        confusedTurnsRemaining =
                            aiType === "confused"
                                ? (actor.ai as ConfusedEnemy).turnsRemaining
                                : 0;
                    }

                    if (actor.inventory) {
                        inventory = [];
                        for (let item of actor.inventory.items) {
                            inventory.push({ itemType: item.name });
                        }
                    }
                }
                return {
                    x: e.x,
                    y: e.y,
                    char: e.char,
                    fg: e.fg,
                    bg: e.bg,
                    name: e.name,
                    fighter,
                    level,
                    aiType,
                    confusedTurnsRemaining,
                    inventory,
                };
            }),
        };
    }

    private saveGame() {
        try {
            localStorage.setItem("roguesave", JSON.stringify(this.toObject()));
        } catch (err) {}
    }

    private static load(
        serializedGameMap: string,
        display: Display
    ): [GameMap, Actor, number] {
        const parsedMap = JSON.parse(serializedGameMap) as SerializedGameMap;
        const playerEntity = parsedMap.entities.find(
            (e) => e.name === "Player"
        );
        if (!playerEntity) throw new Error("shit broke");

        const player = spawnPlayer(playerEntity.x, playerEntity.y);

        player.fighter.hp = playerEntity.fighter?.hp || player.fighter.hp;
        player.level.currentLevel = playerEntity.level
            ? playerEntity.level.currentLevel
            : 0;
        player.level.currentXp = playerEntity.level
            ? playerEntity.level.currentXp
            : 0;
        window.engine.player = player;

        const map = new GameMap(parsedMap.width, parsedMap.height, display, [
            player,
        ]);

        map.tiles = parsedMap.tiles;

        const playerInventory = playerEntity?.inventory || [];

        for (let entry of playerInventory) {
            let item: Item | null = null;
            switch (entry.itemType) {
                case "Health Potion": {
                    item = spawnHealthPotion(map, 0, 0);
                    break;
                }
                case "Lightning Scroll": {
                    item = spawnLightningScroll(map, 0, 0);
                    break;
                }
                case "Confusion Scroll": {
                    item = spawnConfusionScroll(map, 0, 0);
                    break;
                }
                case "Fireball Scroll": {
                    item = spawnFireballScroll(map, 0, 0);
                    break;
                }
                case "Dagger": {
                    item = spawnDagger(map, 0, 0);
                    break;
                }
                case "Sword": {
                    item = spawnSword(map, 0, 0);
                    break;
                }
                case "Leather Armor": {
                    item = spawnLeatherArmor(map, 0, 0);
                    break;
                }
                case "Chain Mail": {
                    item = spawnChainMail(map, 0, 0);
                    break;
                }
            }

            if (item) {
                map.removeEntity(item);
                item.parent = player.inventory;
                player.inventory.items.push(item);
            }
        }

        for (let e of parsedMap.entities) {
            if (e.name === "Orc") {
                const orc = spawnOrc(map, e.x, e.y);
                orc.fighter.hp = e.fighter?.hp || orc.fighter.hp;
                if (e.aiType === "confused") {
                    orc.ai = new ConfusedEnemy(
                        orc.ai,
                        e.confusedTurnsRemaining
                    );
                }
            } else if (e.name === "Troll") {
                const troll = spawnTroll(map, e.x, e.y);
                troll.fighter.hp = e.fighter?.hp || troll.fighter.hp;
                if (e.aiType === "confused") {
                    troll.ai = new ConfusedEnemy(
                        troll.ai,
                        e.confusedTurnsRemaining
                    );
                }
            } else if (e.name === "Health Potion") {
                spawnHealthPotion(map, e.x, e.y);
            } else if (e.name === "Lightning Scroll") {
                spawnLightningScroll(map, e.x, e.y);
            } else if (e.name === "Confusion Scroll") {
                spawnConfusionScroll(map, e.x, e.y);
            } else if (e.name === "Fireball Scroll") {
                spawnFireballScroll(map, e.x, e.y);
            } else if (e.name === "Dagger") {
                spawnDagger(map, e.x, e.y);
            } else if (e.name === "Sword") {
                spawnSword(map, e.x, e.y);
            } else if (e.name === "Leather Armor") {
                spawnLeatherArmor(map, e.x, e.y);
            } else if (e.name === "Chain Mail") {
                spawnChainMail(map, e.x, e.y);
            }
        }

        return [map, player, parsedMap.currentFloor];
    }

    generateFloor(): void {
        this.currentFloor += 1;
        this.gameMap = generateDungeon(
            Game.MAP_WIDTH,
            Game.MAP_HEIGHT,
            Game.MAX_ROOMS,
            Game.MIN_ROOM_SIZE,
            Game.MAX_ROOM_SIZE,
            this.player,
            this.display,
            this.currentFloor
        );
    }

    handleEnemyTurns() {
        this.gameMap.actors.forEach((e) => {
            if (e.isAlive) {
                try {
                    e.ai?.perform(e, this.gameMap);
                } catch {}
            }
        });
    }

    update(event: KeyboardEvent): Base {
        if (event.key === "s") {
            this.saveGame();
            return this;
        }

        const action = this.inputHandler.handleKeyboardInput(event);

        if (action instanceof BaseAction) {
            try {
                action.perform(this.player, this.gameMap);
                this.handleEnemyTurns();
                this.gameMap?.updateFov(this.player);
            } catch (error) {
                if (error instanceof ImpossibleException) {
                    window.messageLog.addMessage(
                        error.message,
                        Colors.Impossible
                    );
                }
            }
        }
        this.inputHandler = this.inputHandler.nextHandler;

        this.render();
        return this;
    }

    render() {
        this.display.clear();

        window.messageLog.render(this.display, 21, 45, 40, 5);

        renderHealthBar(
            this.display,
            this.player.fighter.hp,
            this.player.fighter.maxHp,
            20
        );

        renderNamesAtLocation(
            21,
            44,
            this.inputHandler.mousePosition,
            this.gameMap
        );

        this.display.drawText(0, 47, `Dungeon level: ${this.currentFloor}`);

        this.gameMap.render();

        if (this.inputHandler.inputState === InputState.Log) {
            renderFrameWithTitle(3, 3, 74, 38, "Message History");
            window.messageLog.renderMessages(
                this.display,
                4,
                4,
                72,
                36,
                window.messageLog.messages.slice(
                    0,
                    this.inputHandler.logCursorPosition + 1
                )
            );
        }

        if (this.inputHandler.inputState === InputState.Target) {
            const [x, y] = this.inputHandler.mousePosition;
            this.display.drawOver(x, y, null, "#000", "#fff");
        }

        this.inputHandler.onRender(this.display);
    }

    renderInventory(title: string) {
        const itemCount = this.player.inventory.items.length;
        const height = itemCount + 2 <= 3 ? 3 : itemCount + 2;
        const width = title.length + 4;
        const x = this.player.x <= 30 ? 40 : 0;
        const y = 0;

        renderFrameWithTitle(x, y, width, height, title);

        if (itemCount > 0) {
            this.player.inventory.items.forEach((i, index) => {
                const key = String.fromCharCode("a".charCodeAt(0) + index);
                this.display.drawText(
                    x + 1,
                    y + index + 1,
                    `(${key}) ${i.name}`
                );
            });
        } else {
            this.display.drawText(x + 1, y + 1, "(Empty)");
        }
    }
}

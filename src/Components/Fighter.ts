import { Colors } from "../Colors/Colors";
import { Actor, RenderOrder } from "../Entity/Entity";
import { Base } from "./Base";

export class Fighter implements Base {
    entity: Actor | null;
    _hp: number;

    constructor(
        public maxHp: number,
        public defense: number,
        public power: number
    ) {
        this._hp = maxHp;
        this.entity = null;
    }

    public get hp(): number {
        return this._hp;
    }

    public set hp(value: number) {
        this._hp = Math.max(0, Math.min(value, this.maxHp));

        if (this._hp === 0 && this.entity?.isAlive) this.die();
    }

    die() {
        if (!this.entity) return;

        let deathMessage = "";
        let fg = null;

        if (window.engine.player === this.entity) {
            deathMessage = "You died!";
            fg = Colors.PlayerDie;
        } else {
            deathMessage = `${this.entity.name} is dead!`;
            fg = Colors.EnemyDie;
        }

        this.entity.char = "%";
        this.entity.fg = "#bf0000";
        this.entity.blocksMovement = false;
        this.entity.ai = null;
        this.entity.name = `Remains of ${this.entity.name}`;
        this.entity.renderOrder = RenderOrder.Corpse;

        window.engine.messageLog.addMessage(deathMessage, fg);
    }
}

import { Base } from "./Base";

import { Base as BaseEntity } from "../../Entity/Base";

export class LogAction extends Base {
    constructor(public moveLog: () => void) {
        super();
    }

    perform(_entity: BaseEntity) {
        this.moveLog();
    }
}

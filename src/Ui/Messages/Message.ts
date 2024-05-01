import { Colors } from "../../Colors/Colors";

export class Message {
    count: number;

    constructor(public plainText: string, public fg: Colors) {
        this.count = 1;
    }

    get fullText(): string {
        if (this.count > 1) {
            return `${this.plainText} (x${this.count})`;
        }
        return this.plainText;
    }
}

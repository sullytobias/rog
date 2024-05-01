import { Base as BaseAction } from "../Movement/Actions/Base";

export type ActionCallback = (x: number, y: number) => BaseAction | null;

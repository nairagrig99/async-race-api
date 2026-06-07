import type {WinnerModalActionType} from "../enums/winner-modal-action-type.ts";
import type {WinnerModel} from "./winner-state.ts";

export type WinnerModalAction =
    { type: WinnerModalActionType.SHOW_WINNER, payload: WinnerModel }
    | { type: WinnerModalActionType.HIDDE_WINNER }
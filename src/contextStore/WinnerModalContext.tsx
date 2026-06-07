import {createContext} from "react";
import type {ModalWinnerState} from "../interface/modal-state.ts";
import type {WinnerModel} from "../interface/winner-state.ts";

export type WinnerModalContextType = {
    state: ModalWinnerState,
    showWinnerModal: (winner: WinnerModel) => void,
    hideWinnerModal: () => void,

}
export const WinnerModalContext = createContext<WinnerModalContextType>({
    state: {isOpen: false, winner: null},
    showWinnerModal: () => {
    },
    hideWinnerModal: () => {
    }
})
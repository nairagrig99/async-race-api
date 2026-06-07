import {type ReactNode, useReducer} from "react";
import {WinnerModalContext} from "./WinnerModalContext.tsx";
import type {ModalWinnerState} from "../interface/modal-state.ts";
import type {WinnerModalAction} from "../interface/winner-modal-action.ts";
import {WinnerModalActionType} from "../enums/winner-modal-action-type.ts";
import type {WinnerModel} from "../interface/winner-state.ts";

const initialState: ModalWinnerState = {
    isOpen: false,
    winner: null
}
const winnerModal = (state: ModalWinnerState, action: WinnerModalAction): ModalWinnerState => {
    switch (action.type) {
        case WinnerModalActionType.SHOW_WINNER:
            return {
                ...state,
                isOpen: true,
                winner: action.payload
            }
        case WinnerModalActionType.HIDDE_WINNER:
            return {
                isOpen: false,
                winner: null
            }
        default:
            return state;
    }
}

export function WinnerModalProvider({children}: { children: ReactNode }) {

    const [state, dispatch] = useReducer(winnerModal, initialState)

    const showWinnerModal = (winner: WinnerModel) => {
        dispatch({type: WinnerModalActionType.SHOW_WINNER, payload: winner})
    }
    const hideWinnerModal = () => {
        dispatch({type: WinnerModalActionType.HIDDE_WINNER})
    }

    return <WinnerModalContext.Provider value={{state, showWinnerModal, hideWinnerModal}}>
        {children}
    </WinnerModalContext.Provider>

}
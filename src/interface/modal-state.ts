import type {CarModelInterface} from "./car-modal.ts";
import type {WinnerModel} from "./winner-state.ts";

export interface ModalWinnerState {
    isOpen: boolean;
    winner: WinnerModel | null
}
export interface ModalState {
    isOpen: boolean;
    mode: string,
    car: CarModelInterface | undefined
}
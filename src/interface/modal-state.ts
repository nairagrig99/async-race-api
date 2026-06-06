import type {CarModelInterface} from "./car-modal.ts";

export interface ModalState {
    isOpen: boolean;
    mode: string,
    car: CarModelInterface | undefined
}
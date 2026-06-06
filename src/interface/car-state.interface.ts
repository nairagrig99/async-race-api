import type {CarModelInterface} from "./car-modal.ts";

export interface CarState {
    car: CarModelInterface[],
    loading: boolean,
    error: string | null;
}
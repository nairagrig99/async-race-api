import type {CarModelInterface} from "./car-modal.ts";
import type {ReactNode} from "react";

export interface CarLoopProps {
    carList: CarModelInterface[],
    children: ReactNode | ((car: CarModelInterface) => ReactNode);
}
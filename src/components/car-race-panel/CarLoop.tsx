import type {CarLoopProps} from "../../interface/car-loop-props.ts";

export default function CarLoop({carList, children}: CarLoopProps) {

    if (!carList || carList.length === 0) return null;

    return carList.length > 0 &&
        carList.map((car) =>
            <div key={car.id}>
                {typeof children === 'function' ? children(car) : children}
            </div>
        )

}
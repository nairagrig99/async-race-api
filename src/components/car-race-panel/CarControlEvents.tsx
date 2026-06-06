import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {useState} from "react";
import {removeCar} from "../../services/GarageService.ts";
import Button from "../../UI/Button.tsx";
import {ButtonStyleEnum} from "../../enums/button-style.ts";
import {ButtonType} from "../../enums/button-type.ts";
import type {CarModelInterface} from "../../interface/car-modal.ts";

export default function CarControlEvents({car}: { car: CarModelInterface }) {
    const dispatch = useDispatch<AppDispatch>()
    const selector = useSelector((state: RootState) => state.engineStateSlice)
    const [stopState, setStopState] = useState<boolean>(true);
    const editCar = () => {

    }
    const removeCarFromList = () => {
        if (car.id != undefined) {
            dispatch(removeCar({id: car.id}))
        }
    }
    const startRacing = () => {
        if (car.id != undefined) {

            setStopState(false)
        }
    }
    const stopRacing = () => {
        if (car.id != undefined) {
            setStopState(true)
        }
    }

    return <div className="flex gap-2 h-[70px]">
        <div className="flex flex-col gap-2">
            <Button onClick={editCar}
                    className={ButtonStyleEnum.EDIT_BUTTON + ' ' + (selector.start  ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.EDIT}/>
            <Button onClick={removeCarFromList}
                    disabled={selector.start}
                    className={ButtonStyleEnum.DELETE_BUTTON + ' ' + (selector.start ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.DELETE}/>
        </div>

        <div className="flex flex-col">
            <Button disabled={selector.start || !stopState}
                    onClick={startRacing}
                    className={ButtonStyleEnum.START_BUTTON + ' ' + (selector.start || !stopState ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.START}/>
            <Button onClick={stopRacing}
                    disabled={stopState || selector.stop }
                    className={ButtonStyleEnum.FINISH_BUTTON + ' ' + (stopState || selector.stop ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.STOP}/>
        </div>
    </div>
}
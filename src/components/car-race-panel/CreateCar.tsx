import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import type {CarModelInterface} from "../../interface/car-modal.ts";
import {ButtonType} from "../../enums/button-type.ts";
import {createCar, editCar} from "../../services/GarageService.ts";
import {closeCarModal} from "../../store/ModalSlice.ts";
import {ErrorMessage} from "../../enums/error-message.ts";
import Button from "../../UI/Button.tsx";
import {ButtonStyleEnum} from "../../enums/button-style.ts";
import {DEFAULT_COLOR, FORM_INITIAL_STATE} from "../../constants/constant.ts";
import Input from "../../UI/Input.tsx";
import {CarEnum} from "../../enums/input-name.ts";
import CloseSvg from "../../UI/CloseSvg.tsx";


export default function CreateCarModal() {

    const dialog = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState<string>('');
    const {isOpen, mode, car} = useSelector((state: RootState) => state.modalSlice);
    const [form, setForm] = useState<CarModelInterface>(FORM_INITIAL_STATE);

    useEffect(() => {
        if (!isOpen) {
            setForm(FORM_INITIAL_STATE);
            setError('');
        }
    }, [isOpen]);

    useEffect(() => {
        const modal = dialog.current;

        if (!modal) return;

        if (isOpen) {
            modal.showModal();
            document.body.style.overflow = 'hidden';
        } else {
            modal.close();
            document.body.style.overflow = 'unset';
        }

        return () => {
            if (modal.open) {
                modal.close();
            }
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (mode === ButtonType.EDIT && car) {
            setForm({name: car.name, color: car.color});
        } else {
            setForm(FORM_INITIAL_STATE);
        }
    }, [mode, car]);

    if (!isOpen) return null;

    const handleInputChange = (inputName: string, value: string) => {
        setForm((prev) => ({...prev, [inputName]: value}))
    }
    const handleEvent = () => {
        if (mode === ButtonType.EDIT && car) {
            if (car.id != undefined) {
                if (!validation()) return
                dispatchForm(ButtonType.EDIT, {id: car.id, name: form.name, color: form.color}, car)
            }
        } else {
            dispatchForm(ButtonType.CREATE, form);
        }
    }

    const dispatchForm = (requestType: string, form: CarModelInterface, car?: CarModelInterface | undefined) => {
        if (!validation()) return

        const request = requestType === ButtonType.EDIT && car != undefined && car.id != undefined ?
            dispatch(editCar({
                id: car.id,
                updates: form
            })) : dispatch(createCar({form}))

        request.then(() => {
            dispatch(closeCarModal())
        }).catch(() => {
            setError(ErrorMessage.SERVER_RESPONSE)
        })
    }
    const validation = () => {
        if (form.name === '' || form.color === '') {
            setError(ErrorMessage.FIELD_REQUIRED)
            return false;
        }
        return true;
    }
    return <dialog
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        ref={dialog}
    >
        <div className="p-4 w-[300px] max-w-full flex  flex-col justify-between h-[250px]">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <Input value={form.name}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleInputChange(CarEnum.NAME, event.target.value)
                           }}
                           className="border border-solid px-4 py-2.5 rounded mb-2.5 flex flex-col"
                           label="Car Name"
                           errors={error}
                           name="name"
                           type="text"/>

                    <Input value={form.color || DEFAULT_COLOR}
                           name="color"
                           label="Car Color"
                           className="w-[25px]"
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleInputChange(CarEnum.COLOR, event.target.value)
                           }}
                           type="color"/>
                </div>
                <div className="flex justify-between">

                    <Button onClick={() => dispatch(closeCarModal())}
                            className={ButtonStyleEnum.CANCEL_BUTTON}
                            value={ButtonType.CANCEL}/>

                    <Button onClick={handleEvent}
                            className={ButtonStyleEnum.CREATE_BUTTON}
                            value={mode === ButtonType.CREATE ? ButtonType.CREATE : ButtonType.EDIT}/>

                </div>
            </div>
        </div>
        <CloseSvg onClick={() => dispatch(closeCarModal())}/>
    </dialog>
}
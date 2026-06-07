import {useContext, useEffect, useRef} from "react";
import {WinnerModalContext} from "../../contextStore/WinnerModalContext.tsx";

export default function WinnerModal() {

    const dialog = useRef<HTMLDialogElement>(null);
    const {state} = useContext(WinnerModalContext)

    useEffect(() => {
        const modal = dialog.current;

        if (!modal) return;

        if (state.isOpen) {
            modal.showModal();
        } else {
            modal.close();
        }

        return () => {
            if (modal.open) {
                modal.close();
            }
        };
    }, [state.isOpen]);

    return <dialog ref={dialog} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div
            className="w-[250px] h-[200px] p-[15px] text-center flex flex-col items-center justify-center bg-white text-black">
            <h1>WINNER</h1>
            <h3>NAME: <b>{state.winner?.name}</b></h3>
            <h3>TIME: <b>{state.winner?.time}</b></h3>
        </div>
    </dialog>
}
import {useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import CarPanel from "../components/GaragePanel.tsx";
import CarModal from "../components/car-race-panel/CarModal.tsx";
import CreateCarModal from "../components/car-race-panel/CreateCar.tsx";

export default function GaragePage(){
    const [carListRace, setCarListRace] = useState<HTMLDivElement[]>([])
    const selector = useSelector((state: RootState) => state.carSlice.car);

    const carListForRacing = (carList: HTMLDivElement[]) => {
        if (carList.length) {
            setCarListRace(carList);
        }
    }
    if (!selector.length) return <h3 className="text-[45px] text-center">No Cars</h3>

    return <div>
        <h3 className="text-[45px] mb-3">GARAGE</h3>
        <CarModal carListRace={carListRace}/>
        <CarPanel racingPanel={carListForRacing}/>
        <CreateCarModal/>
    </div>
}
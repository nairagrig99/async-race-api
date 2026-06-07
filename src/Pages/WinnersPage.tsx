import WinnersTable from "../components/winners/WinnersTable.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

export default function WinnersPage() {
    const selector = useSelector((state: RootState) => state.winnerSlice.winners);

    if (!selector.length) return <h3 className="text-[45px] text-center">No Winners</h3>

    return <div>
        <h2 className="text-[45px] mb-3">WINNERS</h2>
        <WinnersTable/>
    </div>}
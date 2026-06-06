import {Pagination} from "../../enums/pagination.ts";
import type {PaginationProps} from "../../interface/pagination-props.ts";
import PrevSvg from "../../UI/PrevSvg.tsx";
import NextSvg from "../../UI/NextSvg.tsx";


export default function PaginationPanel({garageLength, page, pagination,paginationName}: PaginationProps) {
    return <div className="flex justify-between mt-5">
        <div>
            <b>{paginationName} ({garageLength})</b>
        </div>
        <div className="flex gap-2.5">
            <PrevSvg onClick={() => pagination(Pagination.PREV)}/>
            <b>page #{page}</b>
            <NextSvg onClick={() => pagination(Pagination.NEXT)}/>
        </div>

    </div>
}
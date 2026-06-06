import {Pagination} from "../enums/pagination.ts";

export type PaginationProps = {
    garageLength: number,
    page: number,
    paginationName: string,
    pagination: (direction: Pagination) => void;
}
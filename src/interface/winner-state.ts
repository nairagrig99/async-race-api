export interface WinnerModel {
    id: number,
    time: number,
    wins: number,
    name?: string
}

export interface WinnerState {
    winners: WinnerModel[]
}
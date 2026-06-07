import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorMessage} from "../enums/error-message.ts";
import {ServerURL} from "../enums/request-url.ts";
import {CRUD} from "../enums/crud.ts";
import type {WinnerModel} from "../interface/winner-state.ts";

export const getWinners = createAsyncThunk('get/winners', async () => {
    const response = await fetch(`${ServerURL.URL}/winners`, {
        method: CRUD.GET
    })
    if (!response.ok) {
        throw new Error(ErrorMessage.FAILED_GETTING)
    }
    return await response.json();
})

export const updateWinners = createAsyncThunk('update/winners', async (winners: WinnerModel) => {
    const id = winners.id;
    const response = await fetch(`${ServerURL.URL}/winners/${id}`, {
        method: CRUD.PATCH,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(winners)
    })

    if (!response.ok) {
        throw new Error(ErrorMessage.FAILED_GETTING)
    }

    return await response.json();
})
export const setWinners = createAsyncThunk('set/winners', async (winners: WinnerModel) => {

    const response = await fetch(`${ServerURL.URL}/winners`, {
        method: CRUD.POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(winners)
    })

    if (!response.ok) {
        throw new Error(ErrorMessage.FAILED_GETTING)
    }
    const data = await response.json()

    console.log("dataaaaaaaaaaaa", data);

    return data;
})
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServerURL} from "../enums/request-url.ts";
import {ErrorMessage} from "../enums/error-message.ts";

export const EngineService = createAsyncThunk('engine/fetch', async (id: number) => {

    const response = await fetch(`${ServerURL.URL}/engine?id=${id}&status=stopped`, {method: "PATCH"})

    if (!response.ok) throw new Error(ErrorMessage.SERVER_RESPONSE);

    return response.json();
})
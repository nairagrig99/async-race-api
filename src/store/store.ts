import {configureStore} from "@reduxjs/toolkit";
import carSlice from "./CarSlice.ts";
import engineStateSlice from "./EngineState.ts"

export const store = configureStore({
    reducer: {
        carSlice: carSlice.reducer,
        engineStateSlice: engineStateSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import {configureStore} from "@reduxjs/toolkit";
import carSlice from "./CarSlice.ts";
import engineStateSlice from "./EngineState.ts"
import carRaceStartSlice from "./UnicCarRaceStart.ts"
import modalSlice from "./ModalSlice.ts";
export const store = configureStore({
    reducer: {
        carSlice: carSlice,
        engineStateSlice: engineStateSlice,
        carRaceStartSlice:carRaceStartSlice,
        modalSlice:modalSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
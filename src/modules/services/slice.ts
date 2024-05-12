import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {EatenFood} from "../main/food/controllers/food-manager/my-foods/hooks/useMyFoods";

export type State = {
    info?: {
        activityLevel?: number
        age?: number
        email?: string
        first_name?: string
        gender?: string
        height?: number
        last_name?: string
        weight?: number,
        _id?: number
    },
    eatenFoods: EatenFood[],
    doneActivities: []
}

const initialState: State = {
    eatenFoods: [],
    doneActivities: []
};

const slice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        setUserInfo: (state, {payload}: PayloadAction<object>) => {
            state.info = payload
        },
        setEatenFoods: (state, {payload}: PayloadAction<Array<EatenFood>>) => {
            state.eatenFoods = payload;
        }
    },
})

export const {setUserInfo, setEatenFoods} = slice.actions

export default slice.reducer

export const selector = (state: { user: State}) =>
    state.user
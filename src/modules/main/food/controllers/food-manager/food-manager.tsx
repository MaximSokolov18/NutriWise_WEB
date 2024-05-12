import React from "react";
import {Stack} from "@mui/joy";
import {MyFoods} from './my-foods';
import {AllFoods} from './all-foods';
import {Statistics} from './statistics';

export const FoodManager = () => {
    return (
        <Stack direction="row" spacing={6}>
            <Stack direction="column" spacing={3}>
                <MyFoods/>
                <Statistics/>
            </Stack>
            <AllFoods/>
        </Stack>
    )
}
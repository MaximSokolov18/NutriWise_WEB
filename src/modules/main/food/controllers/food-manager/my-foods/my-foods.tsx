import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selector} from "src/modules/services/slice";
import {FoodCard} from './food-card';
import './my-foods.styl';
import {useMyFoods} from "./hooks/useMyFoods";
import CircularProgress from '@mui/joy/CircularProgress';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';

export const MyFoods = () => {
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selector);
    const {getAllEatenFoods} = useMyFoods();
    const isRunUseEffect = useRef(false);

    const loadEntryData = useCallback(async () => {
        if (user?.info?._id) {
            await getAllEatenFoods({userId: user?.info?._id});
        }
    }, []);

    useEffect(() => {
        if (isRunUseEffect.current && user?.info?._id) {
            loadEntryData();
        }

        return () => {
            isRunUseEffect.current = true;
        }
    }, []);

    return (
        <div className="my-foods">
            <div className="my-foods__header">
                <h3 className="my-foods__title">My foods</h3>
            </div>
            <div className="my-foods__content">
                {isLoading ? (<Box width="100%" display="flex" justifyContent="center">
                    <CircularProgress/>
                </Box>) : user.eatenFoods.map((food) => (
                    <FoodCard key={food.id} data={food} setIsLoading={setIsLoading}/>
                ))}
            </div>
        </div>
    );
}
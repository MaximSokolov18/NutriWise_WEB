import React, {useCallback} from 'react';
import {IconButton, Stack} from '@mui/joy';
import {useSelector} from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {EatenFood, useMyFoods} from "../hooks/useMyFoods";
import {formatDate} from 'src/modules/utils';
import {selector} from "src/modules/services/slice";
import './food-card.styl';

type Props = {
    data: EatenFood,
    setIsLoading: (value: boolean) => void
}

export const FoodCard = ({data, setIsLoading}: Props) => {
    const user = useSelector(selector);
    const {deleteFood, getAllEatenFoods} = useMyFoods();

    const onDeleteFood = useCallback(async () => {
        if (user.info?._id) {
            setIsLoading(true);
            await deleteFood({userId: user.info?._id, foodId: data.id});
            await getAllEatenFoods({userId: user.info._id});
            setIsLoading(false);
        }
    }, []);

    return (
        <Stack
            className="food-card"
            direction="column"
            justifyContent="center"
            alignItems="center">
            <div className="food-card__close-button">
                <IconButton onClick={onDeleteFood} variant="solid" size="sm" color="danger">
                    <CloseRoundedIcon />
                </IconButton>
            </div>
            <Stack
                spacing={2}
                className="food-card__content"
                direction="column"
                justifyContent="center"
                alignItems="center">
                <p className="food-card__name">{data.foodName}</p>
                <p className="food-card__date">{formatDate(new Date(data.date))}</p>
                <p className="food-card__calories">{Math.round((data.calories / 100) * data.weight)}kcal</p>
            </Stack>
        </Stack>
    );
}
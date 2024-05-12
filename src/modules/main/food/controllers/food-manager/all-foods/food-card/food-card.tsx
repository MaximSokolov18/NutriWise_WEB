import React, {FormEvent, useCallback, useState} from 'react';
import {
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Input, Modal,
    ModalClose,
    ModalDialog,
    Stack
} from '@mui/joy';
import {useSelector} from "react-redux";
import {getValueFromInput} from "src/modules/utils";
import {selector} from "src/modules/services/slice";
import {CreateFoods} from '../hooks/useFoods';
import {useMyFoods} from "../../my-foods/hooks/useMyFoods";
import './food-card.styl';

type Props = {
    data: CreateFoods
}

export const FoodCard = ({data}: Props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {addFood, getAllEatenFoods} = useMyFoods();
    const user = useSelector(selector);

    const addEatenFood = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const weight = getValueFromInput<number>(formData.get("weight"));
        const date = getValueFromInput<Date>(formData.get("date"));

        if (user?.info?._id) {
            setIsLoading(true);
            const {isError} = await addFood({
                userId: user.info._id,
                foodId: data._id,
                weight,
                date
            });

            if (!isError) {
                setIsOpenModal(false);
                await getAllEatenFoods({userId: user.info._id});
            }

            setIsLoading(false);
        }

    }, [])

    return (
        <>
            <Stack
                className="new-food-card"
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Stack
                    spacing={2}
                    className="new-food-card__content"
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <p className="new-food-card__name">{data.foodName}</p>
                    <Button
                        onClick={() => setIsOpenModal(true)}
                        variant="solid">
                        add
                    </Button>
                </Stack>
            </Stack>
            <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)} style={{zIndex: 1}}>
                <ModalDialog variant="plain">
                    <ModalClose />
                    <DialogTitle>{data.foodName}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={addEatenFood} className="food-creator__form">
                            <Stack spacing={2} direction="column">
                                <p>Calories: {data.calories}</p>
                                <p>Fats: {data.fats}</p>
                                <p>Carbohydrates: {data.carbohydrates}</p>
                                <p>Proteins: {data.proteins}</p>
                                <FormControl>
                                    <FormLabel>Weight</FormLabel>
                                    <Input name="weight" placeholder="Enter food name" type="number"/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                    <Input name="date" placeholder="Enter food name" type="datetime-local"/>
                                </FormControl>

                                <Button
                                    loading={isLoading}
                                    loadingPosition="end"
                                    type="submit">
                                    add
                                </Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>
    );
}
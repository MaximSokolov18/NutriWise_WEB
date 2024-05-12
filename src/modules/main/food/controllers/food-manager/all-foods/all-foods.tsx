import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Stack
} from "@mui/joy";
import debounce from 'lodash/debounce';
import {getValueFromInput} from 'src/modules/utils';
import {FoodCard} from './food-card';
import {useFoods, CreateFoods} from './hooks/useFoods';
import './all-foods.styl';

export const AllFoods = () => {
    const {createFood, searchFoods} = useFoods();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [foodsList, setFoodsList] = useState<CreateFoods[]>([]);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const foodName = getValueFromInput<string>(formData.get("foodName"));
        const calories = getValueFromInput<number>(formData.get("calories"));
        const carbohydrates = getValueFromInput<number>(formData.get("carbohydrates"));
        const proteins = getValueFromInput<number>(formData.get("proteins"));
        const fats = getValueFromInput<number>(formData.get("fats"));

        setIsLoading(true);
        const {isError} = await createFood({
            foodName,
            calories,
            carbohydrates,
            proteins,
            fats
        })
        setIsLoading(false);

        if (!isError) {
            setIsOpenModal(false);
        }
    }, []);

    const search = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const {listFoods, isError} = await searchFoods(event?.target?.value);
        if (!isError && listFoods) {
            setFoodsList(listFoods);
        } else {
            setFoodsList([]);
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="all-foods">
            <div className="all-foods__header">
                <h3 className="all-foods__title">All foods</h3>
            </div>
            <div className="all-foods__search">
                <Input onChange={debounce((event) => search(event), 1000)} placeholder="Search foods..."/>
            </div>
            <div className="all-foods__result-search">
                {isLoading ? (
                    <Box
                        width={505}
                        display="flex"
                        justifyContent="center">
                        <CircularProgress />
                    </Box>
                    ) : foodsList.map((food) => (
                    <FoodCard key={food._id} data={food}/>
                ))}
            </div>
            <div className="all-foods__add-new-food">
                <Button
                    onClick={() => setIsOpenModal(true)}
                    style={{width: '100%'}}>
                    Create new food
                </Button>
                <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)} style={{zIndex: 1}}>
                    <ModalDialog variant="plain">
                        <ModalClose />
                        <DialogTitle>New food</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleSubmit} className="food-creator__form">
                                <Stack spacing={2} direction="column">
                                    <FormControl>
                                        <FormLabel>Food name</FormLabel>
                                        <Input name="foodName" placeholder="Enter food name" type="text"/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Calories per 100g</FormLabel>
                                        <Input name="calories" placeholder="Enter calories" type="number"/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Carbohydrates</FormLabel>
                                        <Input name="carbohydrates" placeholder="Enter carbohydrates" type="number"/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Proteins</FormLabel>
                                        <Input name="proteins" placeholder="Enter proteins" type="number"/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Fats</FormLabel>
                                        <Input name="fats" placeholder="Enter fats" type="number"/>
                                    </FormControl>

                                    <Button
                                        loading={isLoading}
                                        loadingPosition="end"
                                        type="submit">
                                        Create
                                    </Button>
                                </Stack>
                            </form>
                        </DialogContent>
                    </ModalDialog>
                </Modal>
            </div>
        </div>
    )
}
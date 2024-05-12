import {useCallback} from "react";
import axios from "axios";
import {SERVE_MAIN_PART_URL} from "src/modules/constants";
import {useAlert} from "src/modules/contexts/alert-provider";
import {useDispatch} from "react-redux";
import {setEatenFoods} from "src/modules/services/slice";

type AddFoodProps = {
    foodId: number,
    userId: number,
    weight?: number,
    date?: Date
}
type DeleteFoodProps = {
    foodId: number,
    userId: number
}
type GetEatenFoodsProps = {
    userId: number
}
export type EatenFood = {
    id: number,
    foodId: number,
    weight: number,
    calories: number,
    fats: number,
    carbohydrates: number,
    proteins: number,
    foodName: string,
    date: string
}

type UseMyFoods = () => {
    addFood: (props: AddFoodProps) => Promise<{isError: boolean}>,
    deleteFood: (props: DeleteFoodProps) => Promise<{isError: boolean}>,
    getAllEatenFoods: (props: GetEatenFoodsProps) => Promise<{isError: boolean, eatenFoods?: EatenFood[]}>
}

export const useMyFoods: UseMyFoods = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const addFood = useCallback(async ({userId, ...resProps}: AddFoodProps) => {
        const res = await axios.post(`${SERVE_MAIN_PART_URL}/eaten-food/${userId}`, resProps)
            .catch(err => {
                console.log(err);

                const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
                alert?.setAlert({message: errors});
            })

        if (res?.status === 200) {
            alert?.setAlert({message: res.data.message, color: 'success'});
        }

        return {isError: res?.status !== 200};
    }, []);

    const getAllEatenFoods = useCallback(async ({userId}: GetEatenFoodsProps) => {
        const res = await axios.get(`${SERVE_MAIN_PART_URL}/eaten-food/${userId}`)
            .catch(err => {
                console.log(err);

                const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
                alert?.setAlert({message: errors});
            })

        if (res?.status === 200) {
            dispatch(setEatenFoods(res?.data?.eatenFoods));

            return {
                eatenFoods: res?.data?.eatenFoods,
                isError: false
            }
        }

        return {isError: res?.status !== 200};
    }, []);

    const deleteFood = useCallback(async ({userId, foodId}: DeleteFoodProps) => {
        const res = await axios.put(`${SERVE_MAIN_PART_URL}/eaten-food/${userId}`, {foodId})
            .catch(err => {
                console.log(err);

                const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
                alert?.setAlert({message: errors});
            })

        if (res?.status === 200) {
            alert?.setAlert({message: res.data.message, color: 'success'});
        }

        return {isError: res?.status !== 200};
    }, []);

    return {
        addFood,
        deleteFood,
        getAllEatenFoods
    }
}
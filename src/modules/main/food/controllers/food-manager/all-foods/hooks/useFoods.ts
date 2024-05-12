import {useCallback} from "react";
import axios from "axios";
import {SERVE_MAIN_PART_URL} from 'src/modules/constants';
import {useAlert} from "src/modules/contexts/alert-provider";

type CreateFoodProps = {
    foodName?: string,
    calories?: number,
    carbohydrates?: number,
    proteins?: number,
    fats?: number
}
export type CreateFoods = Required<CreateFoodProps> & {_id: number};


type UseFoods = () => {
    createFood: (props: CreateFoodProps) => Promise<{isError: boolean}>,
    searchFoods: (searchInput: string) => Promise<{isError: boolean, listFoods?: Array<CreateFoods>}>
}

export const useFoods: UseFoods = () => {
    const alert = useAlert();

    const createFood = useCallback(async (props: CreateFoodProps) => {
        const res = await axios.post(`${SERVE_MAIN_PART_URL}/food`, props)
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

    const searchFoods = useCallback(async (searchInput: string) => {
        if (!searchInput) {
            return {isError: true};
        }

        const res = await axios.get(`${SERVE_MAIN_PART_URL}/food/search?q=${searchInput}`)
            .catch(err => {
                console.log(err);

                const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
                alert?.setAlert({message: errors});
            })

        if (res?.status === 200) {
            return {
                listFoods: res.data?.listFoods,
                isError: false
            }
        }

        return {isError: res?.status !== 200};
    }, []);

    return {
        createFood,
        searchFoods
    }
}
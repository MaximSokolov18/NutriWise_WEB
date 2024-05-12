import React from "react"
import {FoodManager} from './controllers/food-manager';
import './food.styl';

export const Food = () => {
    return (
        <div className="food-page">
            <h1 className="food-page__title">Food</h1>
            <FoodManager/>
        </div>
    )
}
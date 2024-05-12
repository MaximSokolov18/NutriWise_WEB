import React from "react";
import Button from "@mui/joy/Button";
import basket from '/imgs/introduction/basket.png';
import fruits from '/imgs/introduction/fruits.png';

import './lets-start.styl';

export const LetsStart = () => {
    return (
        <article className="lets-start">
            <div className="lets-start__content">
                <h1 className="lets-start__question">
                    What did you eat today?
                </h1>
                <h3 className="lets-start__suggest">
                    Maybe something should be changed?<br/>
                    Let's analyze
                </h3>
                <Button
                    className="lets-start__lets-start-button"
                    onClick={() => {}}
                    variant="solid">
                    Let`s start
                </Button>
            </div>
            <figure className="lets-start__figure">
                <img className="lets-start__fruits-img" src={fruits} alt="Fruits"/>
                <img className="lets-start__basket-img" src={basket} alt="Basket"/>
            </figure>
        </article>
    );
}
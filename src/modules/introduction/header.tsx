import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/joy/Button';

import './header.styl';

export const Header = () => {
    const navigate = useNavigate();

    const onRegister = useCallback(() => {
        navigate('/register');
    }, []);
    const onLogin = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <header className="introduction-header">
            <h1 className="introduction-header__logo">
                NutriWise
            </h1>
            <div className="introduction-header__registr-login">
                <Button
                    className="introduction-header__button"
                    onClick={onLogin}
                    variant="outlined">
                    Log in
                </Button>
                <Button
                    className="introduction-header__button"
                    onClick={onRegister}
                    variant="solid">
                    Sign up
                </Button>
            </div>
        </header>
    );
}
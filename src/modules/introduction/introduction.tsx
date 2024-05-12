import React, {useEffect, useRef} from "react";
import {CircularProgress, Stack} from "@mui/joy";

import {Header} from './header';
import {LetsStart} from './lets-start';
import {useAuth} from '../auth/auth-provider';

import './introduction.styl';

export const Introduction = () => {
    const auth = useAuth();
    const isRunUseEffect = useRef(false);

    useEffect(() => {
        if (isRunUseEffect.current) {
            auth?.checkUser({redirectForVerify: '/main'});
        }

        return () => {
            isRunUseEffect.current = true;
        }
    }, []);

    return (
        <>
            {auth?.isLoading ? (
                <Stack
                    sx={{height: '100vh'}}
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress color="warning" size="lg" />
                </Stack>) : (
                <div className="introduction">
                    <Header/>
                    <main className="introduction__main">
                        <LetsStart/>
                        <section>

                        </section>
                    </main>
                </div>
            )}

        </>

    );
}
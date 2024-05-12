import React from "react";
import {Route, Routes} from "react-router-dom";
import {RegisterPage, LoginPage, RequireAuth} from "../modules/auth";
import {Introduction} from "../modules/introduction";
import {Main} from '../modules/main';

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Introduction/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/main"
                element={
                    <RequireAuth>
                        <Main/>
                    </RequireAuth>
                }
            />
        </Routes>
    )
}
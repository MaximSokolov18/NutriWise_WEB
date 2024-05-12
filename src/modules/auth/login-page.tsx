import React, {FormEvent} from "react";
import {useAuth} from "./auth-provider";
import {Button, FormControl, FormLabel, Input, Stack} from "@mui/joy";

import './login-page.styl';

export const LoginPage = () => {
    const auth = useAuth();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (auth) {
            auth.login({email, password})
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login__form">
                <h3 className="login__title">Login</h3>
                <Stack spacing={3}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" placeholder="Enter email" type="email"/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" placeholder="Enter password" type="password"/>
                    </FormControl>
                    <Button type="submit">Log in</Button>
                </Stack>
            </form>
        </div>
    );
}
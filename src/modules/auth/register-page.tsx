import React, {FormEvent} from "react";
import {useAuth} from "./auth-provider";
import {Button, FormControl, FormLabel, Input, Radio, RadioGroup, Slider, Stack} from "@mui/joy";
import {getValueFromInput} from 'src/modules/utils';

import './register-page.styl';

const marks = [
    {
        value: 1,
        label: 'no activity',
    },
    {
        value: 2,
        label: '7 activities/week',
    }
];


export const RegisterPage = () => {
    const auth = useAuth();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = getValueFromInput<string>(formData.get("email"));
        const password = getValueFromInput<string>(formData.get("password"));
        const firstName = getValueFromInput<string>(formData.get("first-name"));
        const lastName = getValueFromInput<string>(formData.get("second-name"));
        const gender = getValueFromInput<string>(formData.get("gender"));
        const age = getValueFromInput<number>(formData.get("age"));
        const height = getValueFromInput<number>(formData.get("height"));
        const weight = getValueFromInput<number>(formData.get("weight"));
        const activityLevel = getValueFromInput<number>(formData.get("activityLevel"));

        if (auth) {
            auth.register({
                email,
                password,
                firstName,
                lastName,
                gender: gender?.toLowerCase(),
                age,
                height,
                weight,
                activityLevel
            })
        }
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit} className="register__form">
                <h3 className="register__title">Create Account</h3>
                <Stack spacing={2}>
                    <Stack justifyContent="space-between" direction="row">
                        <Stack>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" placeholder="Enter email" type="email"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input name="password" placeholder="Enter password" type="password"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input name="first-name" placeholder="Enter first name" type="text"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Second name</FormLabel>
                                <Input name="second-name" placeholder="Enter second name" type="text"/>
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormControl>
                                <FormLabel>Age</FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                        }
                                    }}
                                    name="age"
                                    placeholder="Enter age"
                                    type="number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Weight</FormLabel>
                                <Input
                                    endDecorator="kg"
                                    slotProps={{
                                        input: {
                                            min: 0,
                                            max: 300,
                                            step: 1,
                                        }
                                    }}
                                    name="weight"
                                    placeholder="Enter weight"
                                    type="number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Height</FormLabel>
                                <Input
                                    endDecorator="cm"
                                    slotProps={{
                                        input: {
                                            min: 0,
                                            max: 300,
                                            step: 1,
                                        }
                                    }}
                                    name="height"
                                    placeholder="Enter height"
                                    type="number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Activity level</FormLabel>
                                <Slider
                                    name="activityLevel"
                                    aria-label="Custom marks"
                                    defaultValue={1.5}
                                    step={0.1}
                                    valueLabelDisplay="auto"
                                    max={2}
                                    min={1}
                                    marks={marks}
                                />
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    defaultValue="female"
                                    name="gender"
                                    sx={{ my: 1 }}>
                                    <Radio value="female" label="Female" />
                                    <Radio value="male" label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Button loading={auth?.isLoading} loadingPosition="end" type="submit">Registry</Button>
                </Stack>
            </form>
        </div>
    );
}
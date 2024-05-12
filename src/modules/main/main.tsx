import React, {useState} from "react";
import {Stack} from "@mui/joy";
import {Menu} from "./components/menu";
import {TABS} from "./constants";
import {Home} from './home';
import {Food} from './food';
import {Activity} from './activity';

export const Main = () => {
    const [activityTab, setActivityTab] = useState(TABS.HOME);

    return (
        <Stack direction="row">
            <Menu {...{activityTab, setActivityTab}}/>
            {activityTab === TABS.HOME ? <Home/> : null}
            {activityTab === TABS.FOOD ? <Food/> : null}
            {activityTab === TABS.ACTIVITY ? <Activity/> : null}
        </Stack>
    )
}
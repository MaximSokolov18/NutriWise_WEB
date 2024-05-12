import React from "react";
import {List, ListItemButton, ListItemDecorator} from "@mui/joy";
import Restaurant from "@mui/icons-material/Restaurant";
import Home from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {TABS} from '../constants';

type Props = {
    activityTab: TABS,
    setActivityTab: (activityTab: TABS) => void
}

export const Menu = ({activityTab, setActivityTab}: Props) => {
    return (
        <nav>
            <List
                style={{
                    top: 0,
                    left: 0,
                    width: "200px",
                    backgroundColor: "#F6F1E9",
                    height: '100vh'
                }}
                sx={{
                    "--List-padding": "10px",
                    "--List-gap": "20px",
                    "--ListItem-paddingY": "10px",
            }}>
                <ListItemButton
                    onClick={() => setActivityTab(TABS.HOME)}
                    selected={activityTab === TABS.HOME}>
                    <ListItemDecorator>
                        <Home/>
                    </ListItemDecorator>
                    Home
                </ListItemButton>
                <ListItemButton
                    onClick={() => setActivityTab(TABS.FOOD)}
                    selected={activityTab === TABS.FOOD}>
                    <ListItemDecorator>
                        <Restaurant/>
                    </ListItemDecorator>
                    Food
                </ListItemButton>
                <ListItemButton
                    onClick={() => setActivityTab(TABS.ACTIVITY)}
                    selected={activityTab === TABS.ACTIVITY}>
                    <ListItemDecorator>
                        <FitnessCenterIcon/>
                    </ListItemDecorator>
                    Activity
                </ListItemButton>
            </List>
        </nav>
    )
}
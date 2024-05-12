import React, {createContext, useCallback, useContext, useState} from "react";
import {Alert, IconButton} from "@mui/joy";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type Color = "danger" | "primary" | "neutral" | "success" | "warning" | undefined;
type AlertProps = {message: string, color?: Color};

type AlertContextType = {
    setAlert: (props: AlertProps) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<string>('');
    const [color, setColor] = useState<Color>();

    const setAlert = useCallback(({message: newMessage, color: newColor = 'danger'}: AlertProps) => {
        setMessage(newMessage);

        if (newColor) {
            setColor(newColor);
        }
    }, []);

    const onCloseAlert = useCallback(() => {
        setMessage('');
    }, []);

    const value = {setAlert};

    return <AlertContext.Provider value={value}>
        {message ? <Alert
            style={{position: 'fixed', width: '100%', top: 0, zIndex: 2, borderRadius: 0}}
            color={color}
            size="md"
            variant="solid"
            endDecorator={
                <IconButton onClick={onCloseAlert} variant="solid" size="sm" color={color}>
                    <CloseRoundedIcon />
                </IconButton>
            }>
            {message}
        </Alert> : null}
        {children}
    </AlertContext.Provider>;
}

export const useAlert = () => useContext(AlertContext);

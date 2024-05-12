import {useEffect, useRef} from "react";
import {useAuth} from "./auth-provider";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const isRunUseEffect = useRef(false);
    const auth = useAuth();

    useEffect(() => {
        if (isRunUseEffect.current) {
            auth?.checkUser({redirectForBanned: '/login'});
        }

        return () => {
            isRunUseEffect.current = true;
        }
    }, []);

    return children;
}
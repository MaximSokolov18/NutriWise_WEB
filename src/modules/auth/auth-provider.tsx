import React, {createContext, useCallback, useContext, useState} from "react";
import axios from "axios";
import {SERVE_MAIN_PART_URL, TOKEN_KEY} from "../constants";
import {useAlert} from "../contexts/alert-provider";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserInfo} from '../services/slice';

type RegisterProps = {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    gender?: string,
    age?: number,
    height?: number,
    weight?: number,
    activityLevel?: number

};
type LoginProps = {email: string, password: string};
type User = {id: string, firstName: string};

type AuthContextType = {
    user: User | null;
    login: (props: LoginProps) => void;
    checkUser: (redirects: {redirectForVerify?: string, redirectForBanned?: string}) => Promise<void>;
    // signout: (callback: VoidFunction) => void;
    register: (props: RegisterProps) => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const checkSession = useCallback(async () => {
        setIsLoading(true);
        const res = await axios.get(`${SERVE_MAIN_PART_URL}/user/me`, {
            headers: {authorization: "Bearer " + localStorage.getItem(TOKEN_KEY) || ''}
        }).catch(function (err) {
            console.log(err);

            const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
            alert?.setAlert({message: errors});
        })

        if (res?.status === 200) {
                alert?.setAlert({message: res.data.message, color: 'success'});
                setUser(res?.data?.user);
                dispatch(setUserInfo(res?.data?.user));
        }
        setIsLoading(false);

        return {isVerify: res?.status === 200};
    }, []);

    const checkUser = useCallback(async (redirects: {redirectForVerify?: string, redirectForBanned?: string}) => {
        const res = await checkSession();

        if (res?.isVerify && redirects.redirectForVerify) {
            navigate(redirects.redirectForVerify, {state: {from: location}});
        } else if (!res?.isVerify && redirects.redirectForBanned) {
            navigate(redirects.redirectForBanned, {state: {from: location}});
        }
    }, []);

    const login = useCallback((props: LoginProps) => {
        axios.post(`${SERVE_MAIN_PART_URL}/auth/login`, props)
            .then(res => {
                console.log(res);

                alert?.setAlert({message: res.data.message, color: 'success'});
                setUser(res?.data?.user);
                localStorage.setItem(TOKEN_KEY, res?.data?.user.token);

                navigate('/main');
            })
            .catch(err => {
                console.log(err);

                const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
                alert?.setAlert({message: errors});
            })
    }, []);

    const register = useCallback((props: RegisterProps) => {
        setIsLoading(true);
        axios.post(`${SERVE_MAIN_PART_URL}/auth/register`, props)
            .then(res => {
                console.log(res);

                alert?.setAlert({message: res.data.message, color: 'success'});
                navigate('/', {state: {from: '/register'}});
            })
            .catch(err => {
                console.log(err);

                const errors = Object.values(err?.response?.data?.error || [err?.response?.data?.message]).join(', ') || '';
                alert?.setAlert({message: errors});
            })
            .finally(() => {setIsLoading(false)});
    }, []);

    // const signout = () => {
    //     return;
    // };

    const value = {
        user,
        register,
        login,
        checkUser,
        isLoading
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

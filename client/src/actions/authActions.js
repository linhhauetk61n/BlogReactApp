import { AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../api/index";

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        //sign in a user
        const res = await api.signin(formData);
        dispatch({ type: AUTH, payload: res.data.user });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        //sign up a user
        const res = await api.signup(formData);
        dispatch({ type: AUTH, payload: res.data.user });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
export const logout = (navigate) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT });
        navigate("/auth");
    } catch (error) {
        console.log(error);
    }
};

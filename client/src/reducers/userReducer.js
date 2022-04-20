import { AUTH, LOGOUT } from "../constants/actionTypes";
import decode from "jwt-decode";

import { setAuthToken } from "../api";
const checkLocalStorage = () => {
    if (localStorage.getItem("memories_blog_app")) {
        const user = JSON.parse(localStorage.getItem("memories_blog_app"));
        const decodedToken = decode(user?.accessToken);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
            localStorage.clear();
            setAuthToken(null);
            return null;
        } else {
            setAuthToken(user.accessToken);
            return user;
        }
    }
    return null;
};
const INITIAL_STATE = {
    authData: checkLocalStorage(),
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem(
                "memories_blog_app",
                JSON.stringify(action.payload)
            );
            setAuthToken(action.payload.accessToken);
            return { ...state, authData: action.payload };
        case LOGOUT:
            localStorage.clear();
            setAuthToken(null);
            return { ...state, authData: null };
        default:
            return state;
    }
};
export default userReducer;

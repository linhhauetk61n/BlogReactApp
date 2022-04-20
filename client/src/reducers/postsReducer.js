import {
    FETCH_ALL,
    FETCH_POST,
    FETCH_BY_SEARCH,
    LIKE,
    UPDATE,
    DELETE,
    CREATE,
    START_LOADING,
    END_LOADING,
    COMMENT_POST,
} from "../constants/actionTypes";
const INITIAL_STATE = {
    posts: [],
    post: null,
    isLoading: true,
    currentPage: 1,
    numberOfPages: 1,
};

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPage,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.posts };
        case FETCH_POST: {
            return { ...state, post: action.payload };
        }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case COMMENT_POST:
            return {
                ...state,
                posts: state.posts.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                ),
            };
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
                post: action.payload,
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        default:
            return state;
    }
};
export default postReducer;

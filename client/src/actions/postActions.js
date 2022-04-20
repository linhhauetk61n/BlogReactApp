import * as api from "../api";
import {
    FETCH_ALL,
    FETCH_POST,
    LIKE,
    FETCH_BY_SEARCH,
    UPDATE,
    DELETE,
    CREATE,
    START_LOADING,
    END_LOADING,
    COMMENT_POST,
} from "../constants/actionTypes";
//Actions Creater
export const getPosts = (page) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: res.data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: END_LOADING });
        console.log(error);
    }
};
export const getPost = (id) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: res.data.post });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: END_LOADING });
        console.log(error);
    }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: res.data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};
export const createPost = (post, navigate) => async (dispatch) => {
    try {
        const res = await api.createPost(post);
        dispatch({ type: CREATE, payload: res.data.post });
        navigate(`/posts/${res.data.post._id}`);
    } catch (error) {
        console.log(error);
    }
};
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const res = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: res.data.post });
    } catch (error) {
        console.log(error);
    }
};
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};
export const likePost = (id) => async (dispatch) => {
    try {
        const res = await api.likePost(id);
        dispatch({ type: LIKE, payload: res.data.post });
    } catch (error) {
        console.log(error);
    }
};
export const commentPost = (cmt, id) => async (dispatch) => {
    try {
        const res = await api.commentPost(cmt, id);
        dispatch({ type: COMMENT_POST, payload: res.data.post });
        return res.data.post.comments;
    } catch (error) {
        console.log(error);
    }
};

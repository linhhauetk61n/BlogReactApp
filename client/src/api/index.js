import axios from "axios";
const base_url = "https://memories-blog-reactjs.herokuapp.com/api";

const API = axios.create({ baseURL: base_url });

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};
//action API
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
    API.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
            searchQuery.tags
        }`
    );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (postId, updatedPost) =>
    API.put(`/posts/${postId}`, updatedPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId) => API.put(`/posts/like/${postId}`);
export const commentPost = (cmt, id) =>
    API.post(`/posts/comment/${id}`, { cmt });
export const signin = (formData) => API.post("/auth/signin", formData);
export const signup = (formData) => API.post("/auth/signup", formData);

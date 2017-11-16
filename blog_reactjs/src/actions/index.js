import axios from "axios";
import { saveToken, saveRoles, removeRoles, removeToken, getToken } from "../utils/store";
import tokenProvider from "axios-token-interceptor";

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const EDIT_POST = 'edit_post';
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';

export const ROOT_URL = "/api";
export const POSTS_URI = "/posts";
export const SIGNIN_URI = "/signin";
export const SIGNUP_URI = "/signup";

const api = axios.create({
    baseURL: ROOT_URL
});

api.interceptors.request.use(tokenProvider({
    header: 'Authorization',
    headerFormatter: (token) => token,
    getToken: () => getToken()
}));

export function fetchPosts() {
    return function (dispatch) {
        api.get(`${POSTS_URI}`)
            .then(response => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response
                })
            })
            .catch(error => {
                if (error.response.status == 401) {
                    dispatch({type: UNAUTH_USER});
                }
            });
    };
}

export function createPost(values, callback) {
    return function (dispatch) {
        api.post(`${POSTS_URI}`, values)
            .then(response => {
                dispatch({
                    type: CREATE_POST,
                    payload: response
                });
                callback();
            })
            .catch(error => {
                if (error.response.status == 401) {
                    dispatch({type: UNAUTH_USER});
                }
            });
    };
}

export function editPost(id, values, callback) {
    return function (dispatch) {
        api.put(`${POSTS_URI}/${id}`, values)
            .then(response => {
                dispatch({
                    type: EDIT_POST,
                    payload: response
                });
                callback();
            })
            .catch(error => {
                if (error.response.status == 401) {
                    dispatch({type: UNAUTH_USER});
                }
            });
    };
}

export function fetchPost(id) {
    return function (dispatch) {
        api.get(`${POSTS_URI}/${id}`)
            .then(response => {
                dispatch({
                    type: FETCH_POST,
                    payload: response
                })
            })
            .catch(error => {
                if (error.response.status == 401) {
                    dispatch({type: UNAUTH_USER});
                }
            });
    };
}

export function deletePost(id, callback) {
    return function (dispatch) {
        api.delete(`${POSTS_URI}/${id}`)
            .then(()=> {
                dispatch({
                    type: DELETE_POST,
                    payload: id
                });
                callback();
            })
            .catch(error => {
                if (error.response.status == 401) {
                    dispatch({type: UNAUTH_USER});
                }
            });
    };
}

export function signinUser({email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}${SIGNIN_URI}`, {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                saveToken(response.data.token);
                saveRoles(response.data.roles);
                history.push('/');
            })
            .catch(()=> {
                dispatch(authError('Bad login info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    removeToken();
    removeRoles();
    return {type: UNAUTH_USER};
}

export function signupUser({email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}${SIGNUP_URI}`, {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                saveToken(response.data.token);
                saveRoles(response.data.roles);
                history.push('/');
            })
            .catch((response)=> {
                dispatch(authError(response.response.data.error));
            });
    }
}
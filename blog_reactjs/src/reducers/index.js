import { combineReducers } from "redux";
import PostsReducer from "./reducer_posts";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "./reducer_auth";

const rootReducer = combineReducers({
    posts: PostsReducer,
    form: formReducer,
    auth: AuthReducer
});

export default rootReducer;

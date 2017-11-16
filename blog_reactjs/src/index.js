import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/posts_show";
import PostsMenu from "./components/posts_menu";
import PostsEdit from "./components/posts_edit";
import Header from "./components/header";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import Signout from "./components/auth/signout";
import RequireAuth from "./components/auth/require_auth";
import { AUTH_USER } from "./actions/index";

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="row">
                <Route path="/" component={Header}/>
                <Route path="/" component={PostsMenu}/>
                <section className="col-xs-12 col-sm-12 col-md-9">
                    <Switch>
                        <Route path="/signin" component={Signin}/>
                        <Route path="/signout" component={Signout}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/posts/new" component={RequireAuth(PostsNew, ['admin'])}/>
                        <Route path="/posts/edit/:id" component={RequireAuth(PostsEdit, ['admin'])}/>
                        <Route path="/posts/:id" component={RequireAuth(PostsShow)}/>
                        <Route path="/" component={RequireAuth(PostsIndex)}/>
                    </Switch>
                </section>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#content'));
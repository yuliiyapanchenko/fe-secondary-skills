import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewPostTab from "./new_post_tab";

class PostsNav extends Component {

    render() {
        return (
            <ul className="nav nav-tabs posts-nav">
                <li className={window.location.pathname == "/" ? 'active' : ''}>
                    <Link to="/">Posts</Link>
                </li>
                <NewPostTab/>
            </ul>
        )
    }
}

export default PostsNav;
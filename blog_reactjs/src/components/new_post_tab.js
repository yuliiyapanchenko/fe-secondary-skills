import React, { Component } from "react";
import { Link } from "react-router-dom";
import RequireAuth from "./auth/require_auth";

class NewPostTab extends Component {
    render() {
        return (
            <li className={window.location.pathname == "/posts/new" ? 'active' : ''}>
                <Link to="/posts/new">New
                    Post</Link>
            </li>
        )
    }
}

export default RequireAuth(NewPostTab, ['admin']);
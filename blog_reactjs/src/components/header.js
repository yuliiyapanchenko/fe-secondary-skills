import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-light">
                <Link className="navbar-brand" to="/">Home</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }

    renderLinks() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link className={window.location.pathname == "/signout" ? 'active nav-link' : 'nav-link'}
                          to="/signout">Sign Out</Link>
                </li>
            );
        } else {

            return ([
                <li className="nav-item" key={1}>
                    <Link className={window.location.pathname == "/signin" ? 'active nav-link' : 'nav-link'}
                          to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className={window.location.pathname == "/signup" ? 'active nav-link' : 'nav-link'}
                          to="/signup">Sign Up</Link>
                </li>
            ]);
        }
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);
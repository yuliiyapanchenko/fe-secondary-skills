import React, { Component } from "react";
import RequireAuth from "./auth/require_auth";

class Btn extends Component {
    render() {
        const className = `btn pull-xs-right ${this.props.style}`;
        return (
            <button
                className={className}
                onClick={this.executeAction}>
                {this.props.title}
            </button>
        )
    }

    executeAction = ()=> {
        this.props.action();
    };
}

export default RequireAuth(Btn, ['admin']);
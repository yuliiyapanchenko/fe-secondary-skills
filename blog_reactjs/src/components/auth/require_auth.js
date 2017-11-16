import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoles } from "../../utils/store";
import { withRouter } from 'react-router'

export default function (ComposedComponent, permittedRoles) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            console.log(router);
            if (!this.props.authenticated) {
                this.context.router.push('/signin')
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated && this.props.history) {
                this.context.router.push('/signin')
            }
        }

        render() {
            let render = true;
            if (this.props.userRoles && permittedRoles) {
                for (let role of this.props.userRoles) {
                    if (permittedRoles.indexOf(role) === -1) {
                        render = false;
                    }
                }
            }
            return this.props.authenticated === true && render ? <ComposedComponent {...this.props} /> : null
        }
    }

    function mapStateToProps(state) {
        let roles;
        if (getRoles()) {
            roles = getRoles().split(',');
        }

        return {
            authenticated: state.auth.authenticated,
            userRoles: roles
        };
    }

    return withRouter(connect(mapStateToProps)(Authentication));
}
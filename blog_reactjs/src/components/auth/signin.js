import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signinUser, authError } from "../../actions/";

class Signin extends Component {

    handleFormSubmit = ({email, password})=> {
        this.props.signinUser({email, password}, this.props.history);
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <h4>Please sign in to view the content</h4>
                <Field
                    label="Email:"
                    name="email"
                    type="email"
                    component={this.renderField}
                />
                <Field
                    label="Password:"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    };

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMessage}
                </div>
            )
        }
    };

    renderField(field) {
        const {meta : {touched, error}}= field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <fieldset className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </fieldset>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Enter a valid email!";
    }

    if (!values.password) {
        errors.password = "Enter the password!";
    }
    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

export default reduxForm({
    validate,
    form: 'SigninForm'
})(
    connect(mapStateToProps, {signinUser, authError})(Signin)
);
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signupUser } from "../../actions/";

class Signup extends Component {

    handleFormSubmit = ({email, password})=> {
        this.props.signupUser({email, password}, this.props.history);
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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
                <Field
                    label="Confirm password:"
                    name="passwordConfirm"
                    type="password"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
                <Link to="/" className="btn btn-primary">Cancel</Link>
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
        const {meta : {touched, error}} = field;
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
    if (!values.passwordConfirm) {
        errors.passwordConfirm = "Repeat the password!";
    }

    if (values.passwordConfirm !== values.password) {
        errors.passwordConfirm = "Password and confirm password don't match!";
    }
    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

export default reduxForm({
    validate,
    form: 'SignupForm'
})(
    connect(mapStateToProps, {signupUser})(Signup)
);
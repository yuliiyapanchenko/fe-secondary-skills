import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../actions/index";
import PostsNav from "./posts_nav";

class PostsNew extends Component {

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="posts-new">
                <div>
                    <PostsNav/>
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Title"
                            name="title"
                            component={this.renderField}
                        />
                        <Field
                            label="Post Content"
                            name="body"
                            component={this.renderField}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/" className="btn btn-danger">Cancel</Link>
                    </form>
                </div>
            </div>
        )
    }

    renderField(field) {
        const {meta : {touched, error}}= field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, ()=> {
            this.props.history.push('/');
        });
    }
}

function validate(values) {
    const errors = {};

    if (!values.title || values.title.length > 100) {
        errors.title = "Enter a title no more than 100 symbols!";
    }

    if (!values.body || values.title.body > 1000) {
        errors.body = "Enter some post content no more than 1000 symbols!";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);
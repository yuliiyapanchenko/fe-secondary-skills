import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, editPost } from "../actions/index";

class PostsEdit extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
        this.props.initialize(this.props.post);
    }

    render() {
        const {handleSubmit} = this.props;
        const {post} = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <form className="posts-edit" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit the post "{post.title}"</h3>
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
        const {id} = this.props.match.params;
        this.props.editPost(id, values, ()=> {
            this.props.history.push('/');
        });
    }
}

function validate(values) {
    const errors = {};

    if (!values.title || values.title.length > 100) {
        errors.title = "Enter a title no more than 100 symbols!";
    }

    if (!values.body || values.body.length > 1000) {
        errors.body = "Enter some post content no more than 1000 symbols!";
    }
    return errors;
}

function mapStateToProps({posts}, ownProps) {
    const post = posts[ownProps.match.params.id];
    return {post};
}

export default reduxForm({
    validate,
    form: 'PostsEditForm'
})(
    connect(mapStateToProps, {fetchPost, editPost})(PostsEdit)
);
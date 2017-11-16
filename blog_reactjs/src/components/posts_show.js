import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost, editPost } from "../actions/index";
import Btn from "./btn";

class PostsShow extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick = ()=> {
        const {id} = this.props.match.params;
        this.props.deletePost(id, ()=> {
            this.props.history.push('/');
        });
    };

    onEditClick = ()=> {
        const {id} = this.props.match.params;
        this.props.history.push(`/posts/edit/${id}`);
    };

    render() {
        const {post}= this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div className="posts-show">
                <Link to="/">Back to home</Link>
                <Btn title="Edit post" action={this.onEditClick} style="btn-primary"/>
                <Btn title="Delete post" action={this.onDeleteClick} style="btn-danger"/>
                <h3>{post.title}</h3>
                <h6>Date: {new Date(post.date).toLocaleDateString()}</h6>
                <p>{post.body}</p>
            </div>
        );
    }
}

function mapStateToProps({posts}, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost, editPost})(PostsShow);
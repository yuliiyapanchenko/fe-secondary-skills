import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";
import { Link } from "react-router-dom";
import PostsNav from "./posts_nav";
import _ from "lodash";

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                <PostsNav/>
                <div className="posts posts-index">
                    <ul className="list-group">
                        {this.renderPosts()}
                    </ul>
                </div>
            </div>
        );
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post._id}>
                    <Link to={`/posts/${post._id}`}>
                        {post.title}
                    </Link>
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                </li>
            )
        })
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
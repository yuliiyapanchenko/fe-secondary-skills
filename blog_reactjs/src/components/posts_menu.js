import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";
import { NavLink } from "react-router-dom";
import _ from "lodash";

class PostsMenu extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <aside className="aside col-xs-12 col-sm-12 col-md-3">
                <div className="posts-menu">
                    <h4>Latests posts:</h4>
                    <ul className="list-group">
                        {this.renderPosts()}
                    </ul>
                    <h4>All posts: {_.size(this.props.posts)}</h4>
                </div>
            </aside>
        );
    }

    renderPosts() {
        const posts = _.take(_.values(this.props.posts), 5);
        return _.map(posts, post => {
            return (
                <li key={post._id}>
                    <NavLink activeStyle={{color: 'red'}} to={`/posts/${post._id}`}>
                        {post.title}
                    </NavLink>
                </li>
            )
        })
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts}, null, {pure: false})(PostsMenu);
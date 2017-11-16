import { expect } from "../test_helper";
import postsReducer from "../../src/reducers/reducer_posts";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../../src/actions/index";

describe('Posts Reducer', ()=> {

    it('handles action with unknown type', () => {
        expect(postsReducer(undefined, {})).to.eql({});
    });

    it('handles action of type FETCH_POST', () => {
        const post = {_id: '1', title: 'title', body: 'some post'};
        const request = {data: post};
        const action = {type: FETCH_POST, payload: request};
        expect(postsReducer({}, action)['1']).to.eql(post);
    });

    it('handles action of type FETCH_POSTS', () => {
        const post = {
            "_id": "59de0932c39f72259f32e9d9",
            "title": "Post 2",
            "body": "body 2",
            "date": "2017-10-11T12:06:10.392Z"
        };
        const posts = [post];
        const request = {data: posts};

        const action = {type: FETCH_POSTS, payload: request};
        expect(postsReducer([], action)['59de0932c39f72259f32e9d9']).to.eql(post);
    });

    it('handles action of type DELETE_POST', () => {
        const post = {
            "_id": "59de0932c39f72259f32e9d9",
            "title": "Post 2",
            "body": "body 2",
            "date": "2017-10-11T12:06:10.392Z"
        };
        const state = {'59de0932c39f72259f32e9d9': post};
        const request = {data: post};
        const action = {type: DELETE_POST, payload: '59de0932c39f72259f32e9d9'};
        expect(postsReducer(state, action)).to.eql({});
    });

});
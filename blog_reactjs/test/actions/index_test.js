import { expect } from "../test_helper";
import {
    FETCH_POSTS,
    CREATE_POST,
    EDIT_POST,
    FETCH_POST,
    DELETE_POST,
    ROOT_URL,
    fetchPosts,
    createPost,
    editPost,
    fetchPost,
    deletePost
} from "../../src/actions/";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe('Actions', ()=> {

    describe('fetchPosts', ()=> {

        it('has the correct type', ()=> {
            const action = fetchPosts();
            expect(action.type).to.equal(FETCH_POSTS);
        });

        it('has the correct payload', ()=> {
            const posts = [{
                "_id": "59df3abbc39f72259f32e9dc",
                "title": "Post 1",
                "body": "content 1",
                "date": "2017-10-12T09:49:47.751Z"
            }];
            var mock = new MockAdapter(axios);
            mock.onGet(`${ROOT_URL}`).reply(200, {data: posts});
            const action = fetchPosts();

            setTimeout(() => {
                expect(action.posts).to.be.equal(posts);
            }, 0);
        });
    });

    describe('createPost', ()=> {

        it('has the correct type', ()=> {
            const action = createPost();
            expect(action.type).to.equal(CREATE_POST);
        });

        it('has the correct payload', ()=> {
            const post = {
                "title": "Post 1",
                "body": "content 1",
            };
            var mock = new MockAdapter(axios);
            mock.onPost(`${ROOT_URL}`).reply(200, {data: post});
            const action = createPost(post, null);

            setTimeout(() => {
                expect(action.post).to.be.equal(post);
            }, 0);
        });
    });

    describe('editPost', ()=> {

        it('has the correct type', ()=> {
            const action = editPost();
            expect(action.type).to.equal(EDIT_POST);
        });

        it('has the correct payload', ()=> {
            const id = '1';
            const post = {
                "title": "Post 1",
                "body": "content 1",
            };
            var mock = new MockAdapter(axios);
            mock.onPut(`${ROOT_URL}/${id}`).reply(200, {data: post});
            const action = editPost(id, post, null);

            setTimeout(() => {
                expect(action.post).to.be.equal(post);
            }, 0);
        });
    });

    describe('fetchPost', ()=> {

        it('has the correct type', ()=> {
            const action = fetchPost();
            expect(action.type).to.equal(FETCH_POST);
        });

        it('has the correct payload', ()=> {
            const id = "59df3abbc39f72259f32e9dc";
            const post = {
                "_id": "59df3abbc39f72259f32e9dc",
                "title": "Post 1",
                "body": "content 1",
                "date": "2017-10-12T09:49:47.751Z"
            };
            var mock = new MockAdapter(axios);
            mock.onGet(`${ROOT_URL}/${id}`).reply(200, {data: post});
            const action = fetchPost(id);

            setTimeout(() => {
                expect(action.post).to.be.equal(post);
            }, 0);
        });
    });

    describe('deletePost', ()=> {

        it('has the correct type', ()=> {
            const action = deletePost();
            expect(action.type).to.equal(DELETE_POST);
        });

        it('has the correct payload', ()=> {
            const id = "59df3abbc39f72259f32e9dc";
            var mock = new MockAdapter(axios);
            mock.onDelete(`${ROOT_URL}/${id}`).reply(200);
            const action = deletePost(id, null);

            setTimeout(() => {
                expect(action.id).to.be.equal(id);
            }, 0);
        });
    });
});
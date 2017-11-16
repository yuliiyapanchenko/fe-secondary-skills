import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions/index";
import _ from "lodash";

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POSTS:
            sortByDate(action.payload.data);
            return _.mapKeys(action.payload.data, "_id");
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id] = post;
            // return newState;
            return {...state, [action.payload.data._id]: action.payload.data};
        default:
            return state;
    }
}

function sortByDate(dbPosts) {
    dbPosts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
}
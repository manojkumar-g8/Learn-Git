import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postAdder/postSlice";
import postUserReducer from "../features/posts/user/userSlice";

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        posts: postReducer,
        postUser: postUserReducer,
    },
});

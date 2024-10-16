import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// const initialState = [
//     // {
//     //     id: 1,
//     //     title: "Manoj",
//     //     post: "Hello World!",
//     //     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     //     reactions: {
//     //         thumbsUp: 0,
//     //         wow: 0,
//     //         heart: 0,
//     //         rocket: 0,
//     //         coffee: 0,
//     //     },
//     // },
//     // {
//     //     id: 2,
//     //     title: "Kumar",
//     //     post: "Welcome to redux toolkit",
//     //     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     //     reactions: {
//     //         thumbsUp: 0,
//     //         wow: 0,
//     //         heart: 0,
//     //         rocket: 0,
//     //         coffee: 0,
//     //     },
//     // },
// ];

const Post_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(Post_URL);
    return response.data;
});

const initialState = {
    posts: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare: (title, post, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        post,
                        userId: parseInt(userId),
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    },
                };
            },
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);

            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "fulfilled";
                // add my properties

                let min = 1;
                const reOrderData = action.payload.map((post) => {
                    post.date = sub(new Date(), {
                        minutes: min++,
                    }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    };
                    post.post = post.body;
                    return post;
                });
                // add data to state.

                state.posts = reOrderData;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});
export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
//For understand: state.posts.posts = store.storename(initialState).posts
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

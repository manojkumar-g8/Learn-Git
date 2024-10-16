import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 0,
        name: "Ram",
    },
    {
        id: 1,
        name: "Ramesh",
    },
    {
        id: 2,
        name: "Ravi",
    },
];

const postUserSlice = createSlice({
    name: "postUser",
    initialState,
    reducers: {},
});

export const selectAllUsers = (state) => state.postUser;
export default postUserSlice.reducer;

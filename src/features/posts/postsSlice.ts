import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { TPost } from "../../models/TPrepare";

type PostSlice = TPost[];

// type Qwe = [number, string]
// const qwe: Qwe = [1, '1']

const initialState: PostSlice = [
  {
    id: 1,
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: 2,
    title: "Slice...",
    content: "The more I say slice, the more i want pizza.",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<TPost>) => {
      state.push(action.payload);
    },
  },
});

export const secetAllPosts = (state: { posts: any }) => state.posts;

export const { addPost } = postSlice.actions;

export default postSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/services/redux/slices/userSlice";
import unreadMessagesReducer from "@/services/redux/slices/unreadMessageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    unreadMessages: unreadMessagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

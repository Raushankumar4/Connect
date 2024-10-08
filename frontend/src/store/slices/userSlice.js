import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  profile: null,
  otherUsers: [],
  tweet: null,
  allTweets: [],
  otherTweets: [],
  myPost: [],
  refresh: false,
  getAllFollowingPost: null,
  savedPost: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    getCreatedTweets: (state, action) => {
      state.tweet = action.payload;
    },
    getAllTweets: (state, action) => {
      state.allTweets = action.payload;
    },
    getOtherTweets: (state, action) => {
      state.otherTweets = action.payload;
    },
    getMyAllPost: (state, action) => {
      state.myPost = action.payload;
    },
    deletePost: (state, action) => {
      const postIdToDelete = action.payload;
      if (state.myPost) {
        state.myPost = state.myPost?.tweets?.filter(
          (post) => post?._id !== postIdToDelete
        );
      }
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      state.myPost = state.myPost?.tweets?.map((post) =>
        post?._id === updatedPost._id ? { ...post, ...updatedPost } : post
      );
    },
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    followUser: (state, action) => {
      const { userId, followUserId } = action.payload;

      if (state.user) {
        state.user.following = [...state.user.following, followUserId];
      }

      state.otherUsers = state.otherUsers.map((user) =>
        user._id === followUserId
          ? { ...user, followers: [...user.followers, userId] }
          : user
      );
    },
    unfollowUser: (state, action) => {
      const { userId, unfollowUserId } = action.payload;

      if (state.user) {
        state.user.following = state.user.following.filter(
          (id) => id !== unfollowUserId
        );
      }

      state.otherUsers = state.otherUsers.map((user) =>
        user._id === unfollowUserId
          ? { ...user, followers: user.followers.filter((id) => id !== userId) }
          : user
      );
    },

    setAllFollowingPost: (state, action) => {
      state.getAllFollowingPost = action.payload;
    },
    setSavePost: (state, action) => {
      state.savedPost = action.payload;
    },
  },
});

export const {
  setUser,
  setProfile,
  getAllTweets,
  getCreatedTweets,
  getOtherTweets,
  setOtherUsers,
  updateUser,
  getMyAllPost,
  deletePost,
  updatePost,
  toggleRefresh,
  followUser,
  unfollowUser,
  setAllFollowingPost,
  setSavePost,
} = userSlice.actions;

export default userSlice.reducer;

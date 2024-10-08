import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deletePost } from "../slices/userSlice";
import { backendUrl } from "../../constant";
import {
  errorToast,
  successToast,
} from "../../components/ResusableComponents/NotifyToast";

export const deletePostThunk = createAsyncThunk(
  "user/deletePost",
  async ({ id, token }, { dispatch }) => {
    try {
      await axios.delete(`${backendUrl}/api/v1/tweet/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      dispatch(deletePost(id));
      successToast("Post Deleted");
    } catch (error) {
      errorToast(
        "Failed to delete the post:",
        error.response ? error.response.data : error.message
      );
      errorToast("Failed to delete the post. Please try again.");
    }
  }
);

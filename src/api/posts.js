import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import instance from "./index";

const getPosts = async () => {
  const response = await instance.get(`/posts`);
  return response.data;
};

const getPostById = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  return response.data;
};

const addPost = async () => {
  const response = await instance.post("/posts", {
    title: "", // Default empty values
    description: "", // Default empty values
  });
  return response.data;
};

const deletePost = async (id) => {
  const response = await instance.delete(`/posts/${id}`);
  return response.data;
};

const addComment = async (id) => {
  const response = await instance.post(`/posts/${id}/comments`);
  return response.data;
};

const deleteComment = async (id) => {
  const response = await instance.delete(`/posts/comments/${id}`);
  return response.data;
};

export default {
  getPosts,
  getPostById,
  addPost,
  deletePost,
  addComment,
  deleteComment,
};

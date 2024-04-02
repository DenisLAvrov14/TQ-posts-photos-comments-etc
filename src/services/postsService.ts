import axios from "axios";
import { Post } from "../models/Posts";

class PostsService {
  private URL = "https://jsonplaceholder.typicode.com/posts";

  async getAll() {
    return axios.get<Post[]>(`${this.URL}`);
  }
  async addPost(post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }) {
    const newPost: Post = {
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body,
    };
    try {
      const response = await axios.post<Post>(this.URL, newPost);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add post");
    }
  }
  async deletePost(postId: number) {
    try {
      await axios.delete(`${this.URL}/${postId}`);
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
}

export default new PostsService();

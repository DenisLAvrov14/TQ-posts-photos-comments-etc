import axios from "axios";
import { TComments } from "../models/Comment";

class CommentsServices {
  private URL = "https://jsonplaceholder.typicode.com/comments";

  async getAll() {
    return axios.get<TComments[]>(`${this.URL}`);
  }

  async addComment(comment: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }) {
    const newComment: TComments = {
      postId: comment.postId,
      id: comment.id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    };
    try {
      const response = await axios.post<TComments>(this.URL, newComment);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add comment");
    }
  }
  async deleteComment(postId: number) {
    try {
      await axios.delete(`${this.URL}/${postId}`);
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
}

export default new CommentsServices();

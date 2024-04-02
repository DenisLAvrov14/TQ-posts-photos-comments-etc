import { useQuery } from "@tanstack/react-query";
import postsService from "../services/postsService";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => postsService.getAll(),
    select: ({ data }) => data,
    retry: 3,
  });
};

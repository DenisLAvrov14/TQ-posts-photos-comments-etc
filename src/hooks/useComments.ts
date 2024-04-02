import { useQuery } from "@tanstack/react-query";
import commentsServices from "../services/commentsServices";

export const useComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => commentsServices.getAll(),
    select: ({ data }) => data,
    retry: 3,
  });
};

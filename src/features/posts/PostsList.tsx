import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePosts } from "../../hooks/usePosts";
import Comments from "../comments/Comments";
import postsService from "../../services/postsService";
import { useCallback } from "react";
import { Props } from "../../models/PostProps";

const PostsList: React.FC<Props> = (post) => {
    // const posts = useSelector(secetAllPosts)
    const queryClient = useQueryClient();

    const mutationDeletePost = useMutation({
        mutationFn: async (id: number) => {
            await postsService.deletePost(id);
            return id;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const onDeletePost = useCallback(async () => {
        await mutationDeletePost.mutate(post.post.id);
        alert("Comment was deleted")
    }, [mutationDeletePost, post]);

    const { data, isLoading, isError } = usePosts();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {data.map(
                (
                    post // article отдельный компонент
                ) => (
                    <article className="post" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={onDeletePost}> Delete post </button>
                        <Comments
                            post={post}
                        />
                    </article>
                )
            )}
        </section>
    );
};

export default PostsList;

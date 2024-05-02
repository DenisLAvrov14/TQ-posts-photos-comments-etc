import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePosts } from "../../hooks/usePosts";
import Comments from "../comments/Comments";
import postsService from "../../services/postsService";
import { useCallback } from "react";
import { TPost } from "../../models/TPrepare";
import styles from "./PostList.module.css"
import Button from "../../ui-kit/Button/Button";
import { useTranslation } from "react-i18next";

export type Props = {
    post: TPost;
};

export const PostsList: React.FC<Props> = ({ post }) => {
    const { t } = useTranslation();
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

    const handleDeletePost = useCallback(async () => {
        try {
            await mutationDeletePost.mutate(post.id);
            alert("Comment was deleted");
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Error deleting comment. Please try again later.");
        }
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
        <section className={styles.postList}>
            <h2>Posts</h2>
            {data.map((post) => (
                <article className="post" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <div className={styles.postBtn}>
                        <Button onClick={handleDeletePost} text={t('delete')} />
                    </div>
                    <Comments post={post} />
                </article>
            ))}
        </section>
    );
};

export default PostsList;

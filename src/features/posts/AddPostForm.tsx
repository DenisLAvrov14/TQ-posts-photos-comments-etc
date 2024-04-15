import { useCallback, useState, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../../services/postsService";
import styles from "./AddPost.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

type PostFormFields = {
    title: string;
    content: string;
};

const AddPostForm = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<PostFormFields>();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onTitleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
        []
    );

    const onContentChanged = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
        []
    );

    const getNextId = (): number => {
        // use uuidv4 or a more reliable method to generate unique ids
        return Math.floor(Math.random() * (9999 - 500 + 1)) + 500;
    };

    const mutationAddPost = useMutation({
        mutationFn: async (data: PostFormFields) => {
            const result = await postsService.addPost({
                userId: getNextId(),
                id: getNextId(),
                title: data.title,
                body: data.content,
            });
            return result;
        },

        onSuccess: () => {
            setContent("");
            setTitle("");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const onSubmit: SubmitHandler<PostFormFields> = async (data) => {
        try {
            await mutationAddPost.mutate(data);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <section className={styles.addPost}>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    {...register("title", { required: true })}
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    {...register("content", { required: true })}
                    value={content}
                    onChange={onContentChanged}
                />
                <input type="submit" value="Save" className={styles.submitBtn} />
            </form>
        </section>
    );
};

export default AddPostForm;

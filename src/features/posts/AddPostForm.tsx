import { useCallback, useState, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../../services/postsService";
import styles from "./AddPost.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type PostFormFields = {
    title: string;
    content: string;
};

export const AddPostForm = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<PostFormFields>();
    const { t, i18n } = useTranslation();

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
            <h2>{t('addNewPost')}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="postTitle">{t('postTitle')}</label>
                <input
                    type="text"
                    id="postTitle"
                    {...register("title", { required: true })}
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postContent">{t('content')}</label>
                <textarea
                    id="postContent"
                    {...register("content", { required: true })}
                    value={content}
                    onChange={onContentChanged}
                />
                <input type="submit" value={t('save')} className={styles.submitBtn} />
            </form>
        </section>
    );
};

export default AddPostForm;

import { SetStateAction, useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../app/store";
import { addPost } from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { usePosts } from "../../hooks/usePosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../../services/postsService";

const AddPostForm = () => {
    // const dispatch = useDispatch();
    const queryClient = useQueryClient();


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onTitleChange = (e: { target: { value: SetStateAction<string> } }) =>
        setTitle(e.target.value);
    const onContentChanged = (e: { target: { value: SetStateAction<string> } }) =>
        setContent(e.target.value);

    const getNextId = (): number => {
        // use uuidv4
        // Math.floor(Math.random() * 100000)
        return Math.floor(Math.random() * (9999 - 500 + 1)) + 500;
    };

    const mutationAddPost = useMutation({
        mutationFn: async () => {
            const result = await postsService.addPost({
                userId: getNextId(),
                id: getNextId(),
                title: title,
                body: content,
            });
            return result;
        },

        onSuccess: () => {
            setContent("")
            setTitle("")
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const handleAddPost = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            try {
                await mutationAddPost.mutate();
            } catch (error) {
                console.error("Error adding post:", error);
            }
        },
        [mutationAddPost]
    );


    // const onCreatePost = useCallback(() => {
    //     if (title && content) {
    //         dispatch(
    //             addPost({
    //                 id: nanoid(),
    //                 title,
    //                 content,
    //             })
    //         );
    //         setTitle("");
    //         setContent("");
    //     }
    // }, []);

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                {/* <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" >
                    <option value=""></option>
                </select> */}
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={handleAddPost}>
                    Save Post
                </button>
            </form>
        </section>
    );
};
export default AddPostForm;

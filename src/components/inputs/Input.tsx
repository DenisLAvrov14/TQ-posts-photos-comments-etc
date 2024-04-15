import React, { ChangeEvent, useCallback } from "react";
import { InputsProps } from "../../models/TInputs";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentsServices from "../../services/commentsServices";
import styles from "./inputs.module.css"

type CommentFormFields = {
    comment: string
    name: string
    email: string
}

const Inputs: React.FC<InputsProps> = ({
    comment,
    setComment,
    name,
    setName,
    email,
    setEmail,
    post
}) => {

    const queryClient = useQueryClient();

    const { register, handleSubmit } = useForm<CommentFormFields>();

    const onSubmit: SubmitHandler<CommentFormFields> = (data) => {
        console.log(data)
    }

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setComment(e.target.value);
        },
        [setComment]
    );

    const handleInputNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        },
        [setName]
    );

    const handleInputEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
        },
        [setEmail]
    );

    const getNextId = (): number => {
        return Math.floor(Math.random() * (9999 - 500 + 1)) + 500;
    };

    const mutationAddComment = useMutation({
        mutationFn: async () => {
            const result = await commentsServices.addComment({
                postId: post.id,
                id: getNextId(),
                name: name,
                email: email,
                body: comment,
            });
            return result;
        },

        onSuccess: () => {
            // react-hook-form
            setComment("");
            setName("");
            setEmail("");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });



    const handleAddComment = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            try {
                await mutationAddComment.mutate();
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        },
        [mutationAddComment]
    );

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    value={name}
                    onChange={handleInputNameChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        validate: (value) => validateEmail(value) || "Invalid email format"
                    })}
                    value={email}
                    onChange={handleInputEmailChange}
                />
            </div>
            <input
                type="text"
                placeholder="Enter your comment"
                {...register("comment", { required: true })}
                value={comment}
                onChange={handleInputChange}
            />
            <input type="submit" value="Submit" />
        </form>

    );
};

export default Inputs

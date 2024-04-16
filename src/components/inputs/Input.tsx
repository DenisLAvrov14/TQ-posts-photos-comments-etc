import React, { ChangeEvent, useCallback } from "react";
import { InputsProps } from "../../models/TInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentsServices from "../../services/commentsServices";
import styles from "./inputs.module.css";
import Input from "../../ui-kit/Input/Input";
import Submit from "../../ui-kit/Submit/Submit";

type CommentFormFields = {
    comment: string;
    name: string;
    email: string;
};

const Inputs: React.FC<InputsProps> = ({
    comment,
    setComment,
    name,
    setName,
    email,
    setEmail,
    post,
}) => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormFields>();

    const onSubmit: SubmitHandler<CommentFormFields> = async (data) => {
        try {
            await mutationAddComment.mutate(data);
            setComment(""); // Сбрасываем значения после успешной отправки
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

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

    const mutationAddComment = useMutation({
        mutationFn: async (formData: CommentFormFields) => {
            const result = await commentsServices.addComment({
                postId: post.id,
                id: getNextId(),
                name: formData.name,
                email: formData.email,
                body: formData.comment,
            });
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });

    const getNextId = (): number => {
        return Math.floor(Math.random() * (9999 - 500 + 1)) + 500;
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || "Invalid email format";
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
                <Input
                    label={""}
                    error={""}
                    className={styles.inputs}
                    placeholder="Name"
                    {...register("name", { required: true })}
                    value={name}
                    onChange={handleInputNameChange} />
                {errors.name && <p className={styles.error}>Name is required</p>}
                <Input
                    label={""}
                    error={""}
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    })}
                    value={email}
                    onChange={handleInputEmailChange} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <Input
                label={""}
                error={""}
                type="text"
                placeholder="Enter your comment"
                {...register("comment", { required: true })}
                value={comment}
                onChange={handleInputChange}
            />
            {errors.comment && <p className={styles.error}>Comment is required</p>}
            {/* <input type="submit" value="Submit" className={styles.inputsSubmitBtn} /> */}
            <Submit />
        </form>
    );
};

export default Inputs;

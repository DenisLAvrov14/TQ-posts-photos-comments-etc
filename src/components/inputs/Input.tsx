import React, { ChangeEvent, useCallback, useRef } from "react";
import { InputsProps } from "../../models/TInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentsServices from "../../services/commentsServices";
import styles from "./inputs.module.css";
import { useTranslation } from "react-i18next";
import Input from "../../ui-kit/Input/Input";

type CommentFormFields = {
    comment: string;
    name: string;
    email: string;
};

export const Inputs: React.FC<InputsProps> = ({
    setComment,
    setName,
    setEmail,
    post,
}) => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormFields>({
        defaultValues: {
            email: "",
            comment: "",
            name: ""
        }
    }
    );

    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);

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
            setComment("");
            setName("");
            setEmail("");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });

    const onSubmit: SubmitHandler<CommentFormFields> = async (data) => {
        try {
            await mutationAddComment.mutate(data);
            console.log(data)
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
                    className={styles.inputs}
                    label={t('name')}
                    {...register("name", {
                        required: "Enter name",
                        minLength: {
                            value: 4,
                            message: "It must have more than 4 symbols"
                        }
                    })}
                    onChange={handleInputNameChange}
                />
                {errors.name && <p className={styles.inputsP}>{errors.name?.message}</p>}
                <Input
                    label={t('email')}
                    {...register("email", {
                        required: "Enter email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    })}
                    onChange={handleInputEmailChange} />
                {errors.email && <p className={styles.inputsP}>{errors.email?.message}</p>}
            </div>
            <Input
                type="text"
                label={t('comment')}
                {...register("comment", { required: "Enter your comment" })}
                onChange={handleInputChange}
            />
            {errors.comment && <p className={styles.inputsP}>Comment is required</p>}
            <input type="submit" value={t('submit')} className={styles.inputsSubmitBtn} />
        </form>
    );
};

export default Inputs;

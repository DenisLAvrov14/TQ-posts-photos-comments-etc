import React, { useCallback, useEffect } from 'react';
import { TComments } from "../../models/Comment";
import { useComments } from '../../hooks/useComments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import commentsServices from '../../services/commentsServices';
import { Post } from '../../models/Posts';
import styles from "./fakePost.module.css"
import Button from '../../ui-kit/Button/Button';

interface FakeCommentsProps {
    randomComments: TComments[];
    setRandomComments: React.Dispatch<React.SetStateAction<TComments[]>>;
    post: Post;
}

const FakeComments: React.FC<FakeCommentsProps> = ({ randomComments, setRandomComments, post }) => {
    const { data, isLoading, isError } = useComments();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data) {
            const getRandomIndex = (min: number, max: number) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            const randomIndexes: number[] = [];
            while (randomIndexes.length < 3) {
                const index = getRandomIndex(0, data.length - 1);
                if (!randomIndexes.includes(index)) {
                    randomIndexes.push(index);
                }
            }

            const newRandomComments = randomIndexes.map((index) => data[index]);
            setRandomComments(newRandomComments);
        }
    }, [data, setRandomComments]);

    const mutationDeleteComment = useMutation({
        mutationFn: async (id: number) => {
            await commentsServices.deleteComment(id);
            return id;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });

    const onDeleteComment = useCallback(async () => {
        await mutationDeleteComment.mutate(post.id);
        alert("Comment was deleted")
    }, [mutationDeleteComment, post]);


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
        <div className={styles.fakeComments}>
            {randomComments.map((fakeComment) => (
                <article key={fakeComment.id}>
                    <h3>{fakeComment.name}</h3>
                    <h4>{fakeComment.email}</h4>
                    <p>{fakeComment.body}</p>
                    {/* <button onClick={onDeleteComment}>Delete comment</button> */}
                    <Button onClick={onDeleteComment} text={'Delete'} />
                </article>
            ))}
        </div>

    );
};

export default FakeComments;

import { useState } from "react";
import { TComments } from "../../models/Comment";
import FakeComments from "../fakeComments/FakeComments";
import { Props } from "../../models/PostProps";
import Inputs from "../../components/inputs/Input";



export const Comments: React.FC<Props> = ({ post }) => {

    const [comment, setComment] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [randomComments, setRandomComments] = useState<TComments[]>([]);

    return (
        <section>
            <Inputs
                comment={comment}
                setComment={setComment}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                post={post}
            />
            <FakeComments randomComments={randomComments} setRandomComments={setRandomComments} post={post} />
        </section>
    );
};

export default Comments;

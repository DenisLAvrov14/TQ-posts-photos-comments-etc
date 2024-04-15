import AddPostForm from "../../features/posts/AddPostForm";
import PostsList from "../../features/posts/PostsList";
import { TPost } from "../../models/TPrepare";

type Props = {
    post: TPost;
};

export const PostsScreen: React.FC<Props> = ({ post }) => {
    return (
        <div>
            <AddPostForm />
            {/* {.map( <PostItem />) } */}
            <PostsList post={post} />
        </div>
    );
};
export default PostsScreen;

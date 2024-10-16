import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAllPosts,
    getPostError,
    getPostStatus,
    fetchPosts,
} from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostBox = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostStatus);
    const postsError = useSelector(getPostError);

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [fetchPosts, dispatch]);

    const newArr = [...posts].reverse();

    const renderedPosts = newArr.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.post.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <ReactionButtons post={post} />
            </p>
        </article>
    ));
    return (
        <div>
            <h2>Posts</h2>
            {renderedPosts}
        </div>
    );
};

export default PostBox;

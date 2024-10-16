import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😲",
    heart: "❤️",
    rocket: "🚀",
    coffee: "🍵",
};

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(
        ([key, value]) => {
            return (
                <button
                    key={key}
                    type="button"
                    onClick={() =>
                        dispatch(
                            reactionAdded({ postId: post.id, reaction: key })
                        )
                    }
                >
                    {value}&nbsp;{post.reactions[key]}
                </button>
            );
        }
    );
    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;

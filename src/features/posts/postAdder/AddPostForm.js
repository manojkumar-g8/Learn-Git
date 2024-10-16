import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "../user/userSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [userId, setUserId] = useState("");

    const users = useSelector(selectAllUsers);

    const onSavePost = () => {
        if (title && post) {
            dispatch(postAdded(title, post, userId));
        }

        setTitle("");
        setPost("");
    };

    const canSave = title && post && userId;
    const userOptions = users.map((user) => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ));

    return (
        <div>
            <h2>Add a post</h2>
            <form action="">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Write a title:"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div>
                    <label htmlFor="post">Post:</label>
                    <input
                        type="text"
                        id="post"
                        name="post"
                        placeholder="Write a post:"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <select
                        name=""
                        value={userId}
                        id="author"
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        <option value="">--Select Author--</option>
                        {userOptions}
                    </select>
                </div>
                <button type="button" onClick={onSavePost} disabled={!canSave}>
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddPostForm;

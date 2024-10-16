import PostBox from "./features/posts/postAdder/PostBox";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./App.css";
import AddPostForm from "./features/posts/postAdder/AddPostForm";
function App() {
    return (
        <Provider store={store}>
            <main>
                <AddPostForm />
                <PostBox />
            </main>
        </Provider>
    );
}

export default App;

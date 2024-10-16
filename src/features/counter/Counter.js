import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByValue } from "./counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState("");

    const addvalue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    };
    return (
        <section>
            <h3>{count}</h3>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <div>
                <input
                    type="text"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button onClick={() => dispatch(incrementByValue(addvalue))}>
                    add value
                </button>
            </div>
            <div>
                <button onClick={() => resetAll()}>reset</button>
            </div>
        </section>
    );
};

export default Counter;

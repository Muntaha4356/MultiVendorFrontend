import React from "react";
import { useSelector, useDispatch } from "react-redux";

const TestRedux = () => {
  const { isAuthenticated } = useSelector((state) => state.user); // <-- read from store
  const dispatch = useDispatch(); // <-- to dispatch actions

  return (
    <div>
      <h2>Redux Test</h2>
      <p>Authenticated: {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
      <button
        onClick={() =>
          dispatch({
            type: "LoadUserSuccess",
            payload: { id: 1, name: "Polaris" },
          })
        }
      >
        Login (simulate success)
      </button>
      <button
        onClick={() =>
          dispatch({ type: "LoadUserFail", payload: "Unauthorized" })
        }
      >
        Fail (simulate error)
      </button>
      <button onClick={() => dispatch({ type: "clearErrors" })}>
        Clear Errors
      </button>
    </div>
  );
};

export default TestRedux;

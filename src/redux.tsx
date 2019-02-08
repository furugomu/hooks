import React, { useState, useMemo } from "react";
import { createStore } from "redux";
import { render } from "react-dom";

type State = number;
type Action = { type: "increment" } | { type: "decrement" };
const reducer = (state: State = 0, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
  }
  return state;
};

const Counter = () => {
  const store = useMemo(() => createStore(reducer), []);
  const [state, setState] = useState<State>(store.getState());
  store.subscribe(() => setState(store.getState()));
  const dispatch = store.dispatch;
  return (
    <div>
      {state}
      <button type="button" onClick={() => dispatch({ type: "increment" })}>
        +
      </button>
      <button type="button" onClick={() => dispatch({ type: "decrement" })}>
        -
      </button>
    </div>
  );
};

const App = () => (
  <div>
    <Counter />
    <Counter />
  </div>
);

render(<App />, document.querySelector("#here"));

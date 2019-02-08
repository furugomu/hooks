import React, { useState, useMemo, useEffect } from "react";
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
  // ストアを作ってメモる。
  // メモらないとボタンを押すたびに作り直されるので、数字が 0 から変わらず悲しい。
  // deps に reducer を入れているので、reducer の処理が変わるとストアも新しくなる。
  // 普段 reducer が変わることは無いはずだが、HMR するとそういうこともあろうかと思う。
  const store = useMemo(() => createStore(reducer), [reducer]);
  // useState する。初期値は 0 とか書かずにストアから持ってくる。
  const [state, setState] = useState(() => store.getState());
  // ストアが更新されたらその値を setState する。
  // useEffect しないとボタンを押すたびに subscribe されてしまう。
  useEffect(() => store.subscribe(() => setState(store.getState())), [store]);

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

/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import "./styles.css";

const ChildComponent = ({ logging }) => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div className="child--container" style={{ backgroundColor: randomColor }}>
      <span>Child Component</span>
      <button className="button" onClick={() => logging(randomColor)}>
        What's my color ?
      </button>
    </div>
  );
};

const MemoizedChild = React.memo(ChildComponent);

const ParentComponent = () => {
  const reset = React.useState(undefined)[1];

  function logging(color) {
    console.log(`[Child] My color is: ${color}!`);
  }

  // useCallback caches the callback
  const callbackLogging = React.useCallback(logging, []);
  // useMemo caches the **returned value** of the callback
  // in this case, returned value is a callback that returns logging fn
  const memoLogging = React.useMemo(() => logging, []);

  // minor difference: useMemo calls your fn when your component renders for the first time:
  // because it has to cache the **returned value** of the callback
  // it doesn't matter if you don't pass this function as props, useMemo will always call it once
  // useCallback doesn't do that because it caches the function itself
  const memoLoggingDiff = React.useMemo(() => {
    console.log("I'm called...");
    return logging;
  }, []);

  return (
    <div className="parent--container">
      <div className="parent--info">
        <span>Parent Component</span>
        <button className="button" onClick={() => reset({})}>
          Reset
        </button>
      </div>

      <MemoizedChild logging={callbackLogging} />
      {/* <ChildComponent /> */}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <ParentComponent />
    </div>
  );
}

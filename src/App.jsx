import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil, map, buffer, debounceTime } from "rxjs/operators";
import useDebounce from "./useDebounce";
function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    let stream$ = new Subject();
    let myObservable = interval(1000);
    myObservable.pipe(takeUntil(stream$)).subscribe(() => {
      if (status === "start") {
        setSec((val) => val + 1000);
      }
    });
    return () => {
      stream$.next();
      stream$.complete();
    };
  }, [status]);

  const start = () => {
    setStatus("start");
  };
  const stop = () => {
    setStatus("stop");
    setSec(0);
  };

  const reset = () => {
    setSec(0);
  };

  const wait = () => {
    setStatus("wait");
    console.log("1");
  };

  return (
    <div>
      <div> {new Date(sec).toISOString().slice(11, 19)} </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={useDebounce(wait, 300)}>Wait</button>
    </div>
  );
}

export default App;

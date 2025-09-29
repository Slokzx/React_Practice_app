import { useEffect, useMemo, useState } from "react";

const pad = (value: number, size = 2) => value.toString().padStart(size, "0");

const formatTime = (elapsedMs: number) => {
  const milliseconds = Math.floor((elapsedMs % 1000) / 10);
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
};

const StopwatchApp = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [splits, setSplits] = useState<number[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setElapsedMs((prev) => prev + 10);
    }, 10);

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning]);

  const toggle = () => {
    setIsRunning((prev) => !prev);
  };

  const recordSplit = () => {
    if (!isRunning) return;
    setSplits((prev) => [elapsedMs, ...prev]);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedMs(0);
    setSplits([]);
  };

  const statusLabel = useMemo(() => (isRunning ? "Pause" : "Start"), [isRunning]);

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="stopwatch-display">{formatTime(elapsedMs)}</div>
      <div className="stopwatch-controls">
        <button onClick={toggle}>{statusLabel}</button>
        <button onClick={recordSplit} disabled={!isRunning}>
          Split
        </button>
        <button onClick={reset} disabled={elapsedMs === 0 && splits.length === 0}>
          Reset
        </button>
      </div>
      <ul className="stopwatch-splits">
        {splits.map((split, index) => (
          <li key={split + index}>
            <span>Split {splits.length - index}</span>
            <span>{formatTime(split)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopwatchApp;

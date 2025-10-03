import { useEffect, useRef, useState } from "react";
import "./ProgressBar.css";

type ProgressBarProps = {
  startProgress?: number;
};

const normalizeProgress = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 100) {
    return 100;
  }
  return value;
};

const ProgressBar = ({ startProgress }: ProgressBarProps) => {
  const [progress, setProgress] = useState(() => normalizeProgress(startProgress));
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgressInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStart = () => {
    if (isRunning || progress >= 100) {
      return;
    }
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearProgressInterval();
          setIsRunning(false);
          return 100;
        }
        return Math.min(prev + 1, 100);
      });
    }, 500);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearProgressInterval();
  };

  const handleReset = () => {
    setIsRunning(false);
    clearProgressInterval();
    setProgress(normalizeProgress(startProgress));
  };

  useEffect(() => {
    return () => clearProgressInterval();
  }, []);

  return (
    <div className="App">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          <span className="progress-number">{progress}%</span>
        </div>
      </div>
      <div className="buttons">
        <button className="start-buttons" onClick={handleStart}>
          Start
        </button>
        <button className="reset-buttons" onClick={handleReset}>
          Reset
        </button>
        <button className="stop-buttons" onClick={handleStop}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;

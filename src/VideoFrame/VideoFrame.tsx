/**
 * These configurations help control which thumbnails to fetch
 * for the timelapse viewer.
 *
 * NOTE: Please do not edit this object unless instructed to by the interviewer.
 */

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./VideoFrame.css";

type FrameData = {
  frameNumber: number;
  src: string;
};

const API_CONFIG = {
  url: "https://hiring.verkada.com/thumbs",
  startTimestamp: 1500348260,
  endTimestamp: 1503031520,
  framesPerSecond: 50,
  frameCount: 30,
};

const PauseIcon = () => (
  <svg
    width="8"
    height="14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
  >
    <path d="M1 0H0v14h1V0zM8 0H7v14h1V0z" stroke="none" />
  </svg>
);

const PlayIcon = () => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 20 20"
    fill="currentColor"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3l12 7-12 7V3zm0-1c-.17 0-.34.04-.5.13-.31.18-.5.51-.5.87v14c0 .36.19.69.5.87a.993.993 0 0 0 1-.01l12-7A1 1 0 0 0 19 10a1 1 0 0 0-.5-.86l-12-7C6.34 2.05 6.17 2 6 2z"
      stroke="none"
    />
  </svg>
);

// Build frames array
const getFrames = (): FrameData[] => {
  const MS_PER_FRAME = (1 / API_CONFIG.framesPerSecond) * 1000;
  return new Array(API_CONFIG.frameCount).fill().map((_, index) => {
    const timestamp = API_CONFIG.startTimestamp + index * MS_PER_FRAME;
    return {
      frameNumber: index,
      src: `${API_CONFIG.url}/${timestamp}.jpg`,
    };
  });
};

const Frame = ({ frame, timeline }: { frame: FrameData; timeline: ReactNode }) => {
  return (
    <div className="frameWrapper">
      <div className="frameViewport">
        <img
          className="frameImage"
          src={frame.src}
          alt={`Frame ${frame.frameNumber}`}
        />
        {timeline}
      </div>
      <div className="debug">
        <div className="debugSection">
          Debug Information
          <div>Frame #: {frame.frameNumber}</div>
        </div>
        <div className="debugSection">
          API Configuration
          <pre>{JSON.stringify(API_CONFIG, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default function VideoFrame() {
  const [frames] = useState<FrameData[]>(() => getFrames());
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalFrames = frames.length;
  const MS_PER_FRAME = 1000 / API_CONFIG.framesPerSecond;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, MS_PER_FRAME);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, totalFrames, MS_PER_FRAME]);

  // Timeline click
  const handleTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
    const timelineRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - timelineRect.left;
    const clickedFrame = Math.round((clickX / timelineRect.width) * (totalFrames - 1));
    setCurrentFrame(Math.max(0, Math.min(totalFrames - 1, clickedFrame)));
  };

  const handleMarkerSelect = (frameNumber: number) => {
    setCurrentFrame(frameNumber);
  };

  const currentFrameData = frames[currentFrame];

  const timeline = (
    <div
      className="videoTimeline"
      onClick={handleTimelineClick}
      role="group"
      aria-label="Video timeline"
    >
      <div
        className="videoTimeline-progress"
        style={{
          width: `${(currentFrame / Math.max(totalFrames - 1, 1)) * 100}%`,
        }}
      />
      {frames.map((frame) => {
        const position = (frame.frameNumber / Math.max(totalFrames - 1, 1)) * 100;
        const isActive = frame.frameNumber === currentFrame;
        return (
          <button
            type="button"
            key={frame.frameNumber}
            className={`videoTimeline-marker${isActive ? " videoTimeline-marker--active" : ""}`}
            style={{ left: `${position}%` }}
            onClick={(event) => {
              event.stopPropagation();
              handleMarkerSelect(frame.frameNumber);
            }}
            aria-label={`Go to frame ${frame.frameNumber + 1}`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="App">
      <div className="videoFrame">
        {currentFrameData ? <Frame frame={currentFrameData} timeline={timeline} /> : null}
      </div>

      <div className="controls" style={{ marginTop: "10px" }}>
        <button className="play-button" onClick={() => setIsPlaying(true)}>
          <PlayIcon />
        </button>
        <button className="pause-button" onClick={() => setIsPlaying(false)}>
          <PauseIcon />
        </button>
      </div>
    </div>
  );
}

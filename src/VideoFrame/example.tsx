// /**
//  * These configurations help control which thumbnails to fetch
//  * for the timelapse viewer.
//  *
//  * NOTE: Please do not edit this object unless instructed to by the interviewer.
//  */

// import react, { useEffect, useState, useRef } from "react";

// const API_CONFIG = {
//   url: "https://hiring.verkada.com/thumbs",
//   startTimestamp: 1500348260,
//   endTimestamp: 1503031520,
//   framesPerSecond: 50,
//   frameCount: 30,
// };

// const PauseIcon = () => (
//   <svg
//     width="8"
//     height="14"
//     fill="currentColor"
//     xmlns="http://www.w3.org/2000/svg"
//     stroke="currentColor"
//   >
//     <path d="M1 0H0v14h1V0zM8 0H7v14h1V0z" stroke="none" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg
//     width="18"
//     height="16"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//     stroke="currentColor"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M6 3l12 7-12 7V3zm0-1c-.17 0-.34.04-.5.13-.31.18-.5.51-.5.87v14c0 .36.19.69.5.87a.993.993 0 0 0 1-.01l12-7A1 1 0 0 0 19 10a1 1 0 0 0-.5-.86l-12-7C6.34 2.05 6.17 2 6 2z"
//       stroke="none"
//     />
//   </svg>
// );

// // Build frames array
// const getFrames = () => {
//   const MS_PER_FRAME = (1 / API_CONFIG.framesPerSecond) * 1000;
//   return new Array(API_CONFIG.frameCount).fill().map((_, index) => {
//     const timestamp = API_CONFIG.startTimestamp + index * MS_PER_FRAME;
//     return {
//       frameNumber: index,
//       src: `${API_CONFIG.url}/${timestamp}.jpg`,
//     };
//   });
// };

// const Frame = ({ frame }) => {
//   return (
//     <div
//       className="frameWrapper"
//       key={`historical-video-frame-${frame.frameNumber}`}
//     >
//       <img className="frameImage" src={frame.src} />
//       <div className="debug">
//         <div className="debugSection">
//           Debug Information
//           <div>Frame #: {frame.frameNumber}</div>
//         </div>
//         <div className="debugSection">
//           API Configuration
//           <pre>{JSON.stringify(API_CONFIG, undefined, 2)}</pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   const [frames] = useState(getFrames());
//   const [currentFrame, setCurrentFrame] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const intervalRef = useRef(null);
//   const totalFrames = frames.length;
//   const MS_PER_FRAME = 1000 / API_CONFIG.framesPerSecond;

//   useEffect(() => {
//     if (isPlaying) {
//       intervalRef.current = setInterval(() => {
//         setCurrentFrame((prev) => (prev + 1) % totalFrames);
//       }, MS_PER_FRAME);
//     } else if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [isPlaying, totalFrames, MS_PER_FRAME]);

//   // Timeline click
//   const handleTimelineClick = (e) => {
//     const timelineWidth = e.currentTarget.clientWidth;
//     const clickX = e.nativeEvent.offsetX;
//     const clickedFrame = Math.floor((clickX / timelineWidth) * totalFrames);
//     setCurrentFrame(clickedFrame);
//   };

//   return (
//     <div className="App">
//       <Frame frame={frames[currentFrame]} />

//       <div className="controls" style={{ marginTop: "10px" }}>
//         <button className="play-button" onClick={() => setIsPlaying(true)}>
//           <PlayIcon />
//         </button>
//         <button className="pause-button" onClick={() => setIsPlaying(false)}>
//           <PauseIcon />
//         </button>
//       </div>
//       <div
//         className="timeline"
//         onClick={handleTimelineClick}
//         style={{
//           marginTop: "15px",
//           height: "10px",
//           background: "#eee",
//           borderRadius: "5px",
//           cursor: "pointer",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             width: `${(currentFrame / totalFrames) * 100}%`,
//             height: "100%",
//             background: "#007bff",
//             borderRadius: "5px",
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// }

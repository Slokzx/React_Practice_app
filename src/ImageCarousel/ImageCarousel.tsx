import "./ImageCarousel.css";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

type PicsumImage = {
  id: string;
  author: string;
  download_url: string;
  url: string;
};

const DEFAULT_DELAY_MS = 3000;
const MIN_DELAY_MS = 1000;

const ImageCarousel = () => {
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [delayInput, setDelayInput] = useState(`${DEFAULT_DELAY_MS}`);
  const [delayMs, setDelayMs] = useState(DEFAULT_DELAY_MS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const clearIntervalRef = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoAdvance = () => {
    if (intervalRef.current !== null || images.length === 0) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, delayMs);
    inputRef.current?.focus();
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => {
      if (images.length === 0) {
        return prev;
      }
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentImage((prev) => {
      if (images.length === 0) {
        return prev;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const handlePause = () => {
    clearIntervalRef();
  };

  const handleResume = () => {
    startAutoAdvance();
  };

  const handleVideoPause = () => {
    videoRef.current?.pause();
  };

  const handleVideoPlay = () => {
    videoRef.current?.play();
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = Number(event.target.value);
    if (Number.isNaN(index)) {
      return;
    }
    setCurrentImage(Math.min(Math.max(index, 0), images.length - 1));
  };

  const applyDelay = () => {
    const parsed = Number(delayInput);
    if (Number.isNaN(parsed)) {
      setDelayMs(DEFAULT_DELAY_MS);
      setDelayInput(`${DEFAULT_DELAY_MS}`);
      return;
    }

    const normalized = Math.max(parsed, MIN_DELAY_MS);
    setDelayMs(normalized);
    setDelayInput(`${normalized}`);
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadImages = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=1&limit=10",
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = (await response.json()) as PicsumImage[];
        setImages(data);
        setCurrentImage(0);
      } catch (error) {
        if ((error as DOMException).name === "AbortError") {
          return;
        }
        console.error("Failed to fetch images", error);
      }
    };

    void loadImages();

    return () => {
      controller.abort();
      clearIntervalRef();
    };
  }, []);

  useEffect(() => {
    clearIntervalRef();
    startAutoAdvance();
    return () => clearIntervalRef();
  }, [images, delayMs]);

  useEffect(() => {
    if (currentImage >= images.length && images.length > 0) {
      setCurrentImage(0);
    }
  }, [currentImage, images.length]);

  const activeImage = images[currentImage];

  return (
    <div className="image-carousel">
      <h1>Image Carousel</h1>
      {activeImage && (
        <div onMouseEnter={handlePause} onMouseLeave={handleResume}>
          <img
            src={activeImage.download_url}
            alt={activeImage.author}
            height={300}
            width={500}
          />
        </div>
      )}
      <div className="buttons">
        <button className="previous-button" onClick={handlePrevious}>
          Previous
        </button>
        <span>
          {images.length === 0 ? 0 : currentImage + 1} / {images.length}
        </span>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
      <div className="input-form">
        <input
          className="input-element"
          ref={inputRef}
          placeholder="Change Delay Time"
          type="number"
          step={1000}
          min={MIN_DELAY_MS}
          value={delayInput}
          onChange={(event) => setDelayInput(event.target.value)}
        />
        <button className="next-button" onClick={applyDelay}>
          Change Delay Time
        </button>
      </div>
      <div className="image-select">
        <span>Select the image to show: </span>
        <select value={currentImage} onChange={handleSelectChange}>
          {images.map((image, index) => (
            <option key={image.id ?? index} value={index}>
              {index + 1} - {image.url ?? image.download_url}
            </option>
          ))}
        </select>
      </div>
      <div>
        <video width={500} height={300} controls ref={videoRef}>
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="buttons">
          <button className="previous-button" onClick={handleVideoPlay}>
            Play
          </button>
          <button className="next-button" onClick={handleVideoPause}>
            Pause
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;

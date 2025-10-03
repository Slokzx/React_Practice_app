import { useEffect, useRef, useState } from "react";
import "./ImageCarousel.css";

type PicsumImage = {
  id: string;
  author: string;
  download_url: string;
};

type ImageCarouselProps = {
  fetchUrl?: string;
  intervalMs?: number;
};

const DEFAULT_FETCH_URL = "https://picsum.photos/v2/list?page=1&limit=10";
const DEFAULT_INTERVAL_MS = 3000;

const ImageCarousel = ({
  fetchUrl = DEFAULT_FETCH_URL,
  intervalMs = DEFAULT_INTERVAL_MS,
}: ImageCarouselProps) => {
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearCarouselInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    setCurrentImage((prev) => {
      if (images.length === 0) {
        return prev;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => {
      if (images.length === 0) {
        return prev;
      }
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const startCarouselInterval = () => {
    if (intervalRef.current !== null || images.length === 0) {
      return;
    }
    intervalRef.current = setInterval(() => {
      handleNext();
    }, intervalMs);
  };

  const handlePause = () => {
    clearCarouselInterval();
  };

  const handleResume = () => {
    if (intervalRef.current === null) {
      startCarouselInterval();
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const loadImages = async () => {
      try {
        const response = await fetch(fetchUrl, { signal: controller.signal });
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
      clearCarouselInterval();
    };
  }, [fetchUrl]);

  useEffect(() => {
    if (images.length === 0) {
      clearCarouselInterval();
      return;
    }
    startCarouselInterval();
    return () => clearCarouselInterval();
  }, [images]);

  useEffect(() => {
    if (currentImage >= images.length && images.length > 0) {
      setCurrentImage(0);
    }
  }, [currentImage, images.length]);

  return (
    <div className="image-carousel">
      <h1>Image Carousel</h1>
      {images.length > 0 && (
        <div onMouseEnter={handlePause} onMouseLeave={handleResume}>
          <img
            src={images[currentImage].download_url}
            alt={images[currentImage].author}
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
    </div>
  );
};

export default ImageCarousel;

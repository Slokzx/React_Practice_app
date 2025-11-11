# Project Summaries

This document calls out the core idea and notable behaviors for every mini-project bundled with the playground. Use it as a quick orientation guide when jumping between tabs.

## Cinema Booking (`src/CinemaBooking/CinemaBookingApp.tsx`)
- Seat selection flow with tiered pricing and confirmation state.
- Tracks selected seats, updates totals, and toggles availability styling.
- Includes booking summary drawer that reflects current choices.
- **Key APIs:** `useState`, `useMemo` (pricing totals), DOM event handlers.
- **Snippet:**
  ```tsx
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id)
        ? prev.filter((seat) => seat !== id)
        : [...prev, id]
    );
  };
  ```

## Stopwatch (`src/Stopwatch/StopwatchApp.tsx`)
- Classic stopwatch with start, stop, and reset controls.
- Keeps elapsed time in milliseconds using `setInterval` and a ref.
- Renders formatted minutes:seconds:milliseconds with lap support placeholders.
- **Key APIs:** `useState`, `useRef`, `useEffect`, `setInterval`, `clearInterval`.
- **Snippet:**
  ```tsx
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 10);
    }, 10);
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);
  ```

## Tab Form (`src/TabFormComponent/TabFormApp.tsx`)
- Demonstrates controlled form inputs inside a tabbed layout.
- Persists values per tab key, allowing independent form states.
- Validates basic fields and shows inline helper text.
- **Key APIs:** `useState`, `useMemo`, form event handlers.
- **Snippet:**
  ```tsx
  const [formByTab, setFormByTab] = useState<Record<string, FormValues>>({});

  const handleChange = (tabId: string, field: keyof FormValues, value: string) => {
    setFormByTab((prev) => ({
      ...prev,
      [tabId]: { ...prev[tabId], [field]: value },
    }));
  };
  ```

## Quiz App (`src/QuizApp/QuizApp.tsx`)
- Multiple-choice quiz engine powered by a questions array.
- Tracks current question, score, and displays final results.
- Provides instant feedback on option selection with next-step CTA.
- **Key APIs:** `useState`.
- **Snippet:**
  ```tsx
  const handleAnswer = (choice: Answer) => {
    if (choice.correct) setScore((prev) => prev + 1);
    setStep((prev) => prev + 1);
  };
  ```

## Progress Bar (`src/ProgressBar/ProgressBar.tsx`)
- Animated progress indicator with configurable starting point.
- Uses `setInterval` for smooth increments and clamps at 100%.
- Visual bar component plus percentage label for quick read.
- **Key APIs:** `useEffect`, `useState`, `setInterval`, `clearInterval`.
- **Snippet:**
  ```tsx
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 80);
    return () => clearInterval(id);
  }, []);
  ```

## Image Carousel (`src/ImageCarousel/ImageCarousel.tsx`)
- Auto-advancing carousel with manual previous/next controls.
- Wraps around when hitting first or last slide.
- Accepts image list and applies simple fade transitions.
- **Key APIs:** `useState`, `useEffect`, `setInterval`, `clearInterval`.
- **Snippet:**
  ```tsx
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);
  ```

## Ticket Board (`src/TicketBoard/TicketsBoard.tsx`)
- Kanban-style column layout for support tickets.
- Drag-and-drop queue simulation powered by local state.
- Columns show counts and cards track assignee + status tags.
- **Key APIs:** `useState`, pointer/mouse event handlers.
- **Snippet:**
  ```tsx
  const moveTicket = (ticketId: string, nextColumn: ColumnKey) => {
    setColumns((prev) => ({
      ...prev,
      [nextColumn]: [...prev[nextColumn], ticketId],
    }));
  };
  ```

## Wordle (`src/Wordle/Wordle.tsx`)
- Keyboard-driven guessing game matching the Wordle rules.
- Fetches random solutions, stores guesses, and colors tiles based on match.
- Input handler slices/backspaces typed characters and validates on Enter.
- **Key APIs:** `useEffect`, `useState`, `fetch`, `window.addEventListener`, `removeEventListener`.
- **Snippet:**
  ```tsx
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") submitGuess();
      if (event.key === "Backspace") trimGuess();
      if (/^[a-zA-Z]$/.test(event.key)) appendLetter(event.key);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentGuess]);
  ```

## Video Carousel (`src/VideoFrame/VideoFrame.tsx`)
- Timelapse viewer that plays through thirty precomputed frames.
- Floating timeline overlay with markers for every frame and play/pause controls.
- Clickable scrub bar jumps to frames; looped playback via interval ref.
- **Key APIs:** `useState`, `useEffect`, `useRef`, `setInterval`, `clearInterval`, DOM measurement (`getBoundingClientRect`).
- **Snippet:**
  ```tsx
  const handleTimelineClick = (event: MouseEvent<HTMLDivElement>) => {
    const { width, left } = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - left) / width;
    setCurrentFrame(Math.round(ratio * (frames.length - 1)));
  };
  ```

## JS Playground (`src/JSPlayground/JSPlayground.tsx`)
- Lightweight JavaScript runner executing code inside a sandboxed `Function`.
- Editor features line numbers, tab insertion, reset state, and console capture.
- Output pane separates return value from captured console logs with error display.
- **Key APIs:** `useState`, `useRef`, `new Function`, keyboard event handling, custom console proxying.
- **Snippet:**
  ```tsx
  const runCode = () => {
    const logs: string[] = [];
    const consoleProxy = { log: (...args: unknown[]) => logs.push(args.join(" ")) };
    // eslint-disable-next-line no-new-func
    const result = new Function("console", "\"use strict\";" + code)(consoleProxy);
    setConsoleLogs(logs);
    setResult(formatValue(result));
  };
  ```

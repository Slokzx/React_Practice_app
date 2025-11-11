import { useRef, useState, type UIEvent } from "react";
import "./JSPlayground.css";

const starterCode = `const message = "Hello there!";
message;`;

const formatValue = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
};

const JavaScriptPlayground = () => {
  const [code, setCode] = useState(starterCode);
  const [result, setResult] = useState<string>("Result will show up here.");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineNumberRef = useRef<HTMLPreElement | null>(null);

  const lineNumbers = code
    .split("\n")
    .map((_, index) => String(index + 1))
    .join("\n");

  const runCode = () => {
    const capturedLogs: string[] = [];
    const pushLog = (...values: unknown[]) => {
      const formatted = values.map((value) => formatValue(value)).join(" ");
      capturedLogs.push(formatted);
    };
    const sandboxConsole: Pick<Console, "log" | "info" | "warn" | "error"> = {
      log: (...values) => pushLog(...values),
      info: (...values) => pushLog(...values),
      warn: (...values) => pushLog(...values),
      error: (...values) => pushLog(...values),
    };

    try {
      // eslint-disable-next-line no-new-func
      const output = new Function("console", "\"use strict\";\n" + code)(
        sandboxConsole
      );
      const safeOutput = formatValue(output);
      setResult(safeOutput === undefined ? "undefined" : safeOutput);
      setErrorMessage("");
      setConsoleLogs(capturedLogs);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
      setResult("Could not finish the code.");
      setConsoleLogs(capturedLogs);
    }
  };

  const handleScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    if (lineNumberRef.current) {
      lineNumberRef.current.scrollTop = event.currentTarget.scrollTop;
    }
  };

  const insertTab = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab") return;

    event.preventDefault();
    const element = event.currentTarget;
    const { selectionStart, selectionEnd, value } = element;

    const nextValue =
      value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);

    setCode(nextValue);

    requestAnimationFrame(() => {
      const caret = selectionStart + 2;
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });
  };

  return (
    <div className="playground">
      <h2>JavaScript Playground</h2>
      <p className="playground-note">
        Type some JavaScript. Press Run and the playground will show the value
        it gets back.
      </p>
      <div className="playground-editor">
        <pre
          className="playground-gutter"
          ref={lineNumberRef}
          aria-hidden="true"
        >
          {lineNumbers}
        </pre>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onScroll={handleScroll}
          className="playground-input"
          rows={10}
          spellCheck={false}
          onKeyDown={insertTab}
        />
      </div>
      <div className="playground-actions">
        <button type="button" onClick={runCode}>
          Run code
        </button>
        <button
          type="button"
          onClick={() => {
            setCode(starterCode);
            setResult("Result will show up here.");
            setErrorMessage("");
            setConsoleLogs([]);
            if (lineNumberRef.current) {
              lineNumberRef.current.scrollTop = 0;
            }
            if (textareaRef.current) {
              textareaRef.current.scrollTop = 0;
            }
          }}
        >
          Reset
        </button>
      </div>
      <div className="playground-output">
        <div className="playground-output-section" aria-live="polite">
          <h3>Return Value</h3>
          <pre>{result}</pre>
          {errorMessage ? (
            <p className="playground-error">Error: {errorMessage}</p>
          ) : null}
        </div>
        <div className="playground-output-section">
          <h3>Console</h3>
          {consoleLogs.length === 0 ? (
            <p className="playground-console-empty">No console output yet.</p>
          ) : (
            <ul className="playground-console-list">
              {consoleLogs.map((log, index) => (
                <li key={`console-log-${index}`}>
                  <pre>{log}</pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaScriptPlayground;

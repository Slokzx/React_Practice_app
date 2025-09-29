import { type ReactElement, useState } from "react";
import "./App.css";
import CinemaBookingApp from "./CinemaBooking/CinemaBookingApp";
import StopwatchApp from "./Stopwatch/StopwatchApp";
import TabFormApp from "./TabFormComponent/TabFormApp";

type ProjectRegistry = {
  "cinema-booking": {
    title: string;
    component: () => ReactElement;
  };
  stopwatch: {
    title: string;
    component: () => ReactElement;
  };
  tabForm: {
    title: string;
    component: () => ReactElement;
  };
};

const projectRegistry: ProjectRegistry = {
  "cinema-booking": {
    title: "Cinema Booking",
    component: CinemaBookingApp,
  },
  stopwatch: {
    title: "Stopwatch",
    component: StopwatchApp,
  },
  tabForm: {
    title: "Tab Form",
    component: TabFormApp,
  },
};

type ProjectKey = keyof typeof projectRegistry;

type TabInstance = {
  id: string;
  projectKey: ProjectKey;
  title: string;
};

const createTabId = (projectKey: ProjectKey) =>
  `${projectKey}-${Math.random().toString(36).slice(2, 9)}-${Date.now()}`;

const createTabInstance = (
  projectKey: ProjectKey,
  existingCount = 0,
  customTitle?: string
): TabInstance => {
  const baseTitle = projectRegistry[projectKey].title;
  const title = customTitle ??
    (existingCount === 0 ? baseTitle : `${baseTitle} ${existingCount + 1}`);
  return {
    id: createTabId(projectKey),
    projectKey,
    title,
  };
};

const initialProjects: ProjectKey[] = ["cinema-booking", "stopwatch", "tabForm"];
const initialTabs = initialProjects.map((projectKey) =>
  createTabInstance(projectKey)
);

const App = () => {
  const [tabs, setTabs] = useState<TabInstance[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState<string>(
    initialTabs[0]?.id ?? ""
  );
  const [selectedProject, setSelectedProject] =
    useState<ProjectKey>("cinema-booking");

  const handleAddTab = () => {
    const occurrences = tabs.filter(
      (tab) => tab.projectKey === selectedProject
    ).length;
    const newTab = createTabInstance(selectedProject, occurrences);
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId: string) => {
    setTabs((prevTabs) => {
      if (prevTabs.length === 1) {
        return prevTabs;
      }
      const nextTabs = prevTabs.filter((tab) => tab.id !== tabId);
      if (nextTabs.length === prevTabs.length) {
        return prevTabs;
      }
      if (tabId === activeTabId) {
        const fallbackTab = nextTabs[nextTabs.length - 1];
        setActiveTabId(fallbackTab.id);
      }
      return nextTabs;
    });
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const ProjectComponent = activeTab
    ? projectRegistry[activeTab.projectKey].component
    : null;

  return (
    <div className="App">
      <header>
        <h1>Project Playground</h1>
        <p className="app-subtitle">
          Switch between mini-projects and spin up new tabs on demand.
        </p>
      </header>

      <section className="tab-shell">
        <div className="tab-list" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeTab?.id}
              className={`tab-button ${tab.id === activeTab?.id ? "active" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span>{tab.title}</span>
              {tabs.length > 1 && (
                <span
                  className="tab-close"
                  role="button"
                  aria-label={`Close ${tab.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCloseTab(tab.id);
                  }}
                >
                  ×
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="tab-actions">
          <label htmlFor="project-picker">Add project tab:</label>
            <select
              id="project-picker"
              value={selectedProject}
              onChange={(event) => {
                const value = event.target.value as ProjectKey;
                if (value in projectRegistry) {
                  setSelectedProject(value);
                }
              }}
            >
            {Object.entries(projectRegistry).map(([key, project]) => (
              <option key={key} value={key}>
                {project.title}
              </option>
            ))}
          </select>
          <button onClick={handleAddTab}>Add Tab</button>
        </div>
      </section>

      <section className="tab-panel" role="tabpanel">
        {ProjectComponent ? <ProjectComponent /> : <p>Select a project.</p>}
      </section>
    </div>
  );
};

export default App;

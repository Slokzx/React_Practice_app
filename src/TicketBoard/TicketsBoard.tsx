import "./App.css";
import { useMemo, useState } from "react";
import type { ChangeEvent, FC } from "react";
import { sampleTickets } from "./sampleData";
import { TicketCards } from "./TicketCards";

type Agent = { name: string };
export type Ticket = {
  id: string;
  name: string;
  description: string;
  agent: Agent;
  status: string;
};

export const Badge: FC<{ status: string }> = ({ status }) => {
  const key = status.toLowerCase().replace(/\s+/g, "-"); // "In Progress" -> "in-progress"
  return (
    <span className={`badge badge--${key}`} role="status">
      {status}
    </span>
  );
};

const pickAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const paletteIndex = (hash % 8) + 1; // 1..8
  return `avatar--c${paletteIndex}`;
};

export const Avatar: FC<{ name: string; size?: "sm" | "md" | "lg" }> = ({
  name,
  size = "md",
}) => {
  const nameInitials = name
    .split(" ")
    .map((segment) => segment[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={`avatar avatar--${size} ${pickAvatarColor(name)}`}
      aria-label={name}
    >
      {nameInitials}
    </span>
  );
};

type FilterState = {
  statuses: string;
  agents: string;
};

type FilterName = keyof FilterState;

type FiltersProps = {
  agents: string[];
  statuses: string[];
  filters: FilterState;
  onFilterChange: (filter: FilterName, value: string) => void;
};

const Filters: FC<FiltersProps> = ({
  agents,
  statuses,
  filters,
  onFilterChange,
}) => {
  const handleAgentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("agents", event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("statuses", event.target.value);
  };

  return (
    <section className="filters">
      <div className="field">
        <label className="field__label">Filter by Agent</label>
        <div className="select-wrapper">
          <select
            className="select"
            value={filters.agents}
            onChange={handleAgentChange}
          >
            <option value="">All agents</option>
            {agents.map((agent) => (
              <option key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
          <span className="select-chevron" aria-hidden>
            ▾
          </span>
        </div>
      </div>

      <div className="field">
        <label className="field__label">Filter by Status</label>
        <div className="select-wrapper">
          <select
            className="select"
            value={filters.statuses}
            onChange={handleStatusChange}
          >
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <span className="select-chevron" aria-hidden>
            ▾
          </span>
        </div>
      </div>
    </section>
  );
};

const TicketsBoard = () => {
  const statuses = useMemo(
    () => Array.from(new Set(sampleTickets.map((ticket) => ticket.status))),
    [],
  );
  const agents = useMemo(
    () =>
      Array.from(new Set(sampleTickets.map((ticket) => ticket.agent.name))),
    [],
  );
  const [filters, setFilters] = useState<FilterState>({
    statuses: "",
    agents: "",
  });

  const handleFilterChange = (filterName: FilterName, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [filterName]: value,
    }));
  };

  const filteredTickets = sampleTickets
    .filter((ticket) => {
      return filters.statuses === "" || filters.statuses === ticket.status;
    })
    .filter((ticket) => {
      return filters.agents === "" || filters.agents === ticket.agent.name;
    });

  return (
    <div className="tickets-board">
      <div className="tickets-header">
        <div>
          <h2 className="tickets-title">All Tickets</h2>
          <p className="tickets-subtitle">
            A focused view of active customer issues
          </p>
        </div>
      </div>

      <Filters
        agents={agents}
        statuses={statuses}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="tickets-grid">
        {filteredTickets.map((ticket) => (
          <TicketCards
            key={ticket.id}
            ticket={ticket}
            Avatar={Avatar}
            Badge={Badge}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketsBoard;

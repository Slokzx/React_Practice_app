import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { sampleTickets } from "./sampleData";
type Agent = { name: string };
type Ticket = {
  id: string;
  name: string;
  description: string;
  agent: Agent;
  status: string;
};

const statusStyles: Record<string, string> = {
  Open: "bg-red-100 text-red-700 ring-red-200",
  "In Progress": "bg-amber-100 text-amber-700 ring-amber-200",
  Resolved: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Closed: "bg-zinc-200 text-zinc-700 ring-zinc-300",
  "On Hold": "bg-indigo-100 text-indigo-700 ring-indigo-200",
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Badge: FC<{ status: string }> = ({ status }) => {
  const cls = statusStyles[status] || "bg-zinc-100 text-zinc-700 ring-zinc-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {status}
    </span>
  );
};

const Avatar: FC<{ name: string; size?: "sm" | "md" | "lg" }> = ({
  name,
  size = "md",
}) => {
  const sizes: Record<string, string> = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  };
  return (
    <span
      className={`inline-flex select-none items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-700 font-semibold ${sizes[size]}`}
    >
      {initials(name)}
    </span>
  );
};

type TicketDetailProps = {
  ticketId?: string;
  headerSlot?: ReactNode;
};

const TicketDetail: FC<TicketDetailProps> = ({ ticketId, headerSlot }) => {
  const ticket = useMemo<Ticket>(() => {
    const fallback = sampleTickets[0];
    if (ticketId) {
      const match = sampleTickets.find((item) => item.id === ticketId);
      if (match) {
        return match;
      }
    }
    if (!fallback) {
      throw new Error("No tickets available");
    }
    return fallback;
  }, [ticketId]);

  return (
    <div className="ticket-detail">
      <div className="ticket-detail__header">
        <div className="ticket-detail__agent">
          <Avatar name={ticket.agent.name} size="lg" />
          <div>
            <h2 className="ticket-detail__title">{ticket.name}</h2>
            <div className="ticket-detail__meta">
              <span>{ticket.agent.name}</span>
              <span>•</span>
              <Badge status={ticket.status} />
            </div>
          </div>
        </div>
        <div className="ticket-detail__actions">
          {headerSlot}
        </div>
      </div>

      <div className="ticket-detail__body">
        <section className="ticket-detail__description">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </section>

        <aside className="ticket-detail__sidebar">
          <h3>Ticket Details</h3>
          <dl>
            <div>
              <dt>Ticket ID</dt>
              <dd>{ticket.id}</dd>
            </div>
            <div>
              <dt>Agent</dt>
              <dd>{ticket.agent.name}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <Badge status={ticket.status} />
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
};

export default TicketDetail;

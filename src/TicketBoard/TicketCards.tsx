import type { ComponentType, FC } from "react";

type AvatarComp = ComponentType<{
  name: string;
  size?: "sm" | "md" | "lg";
}>;
type BadgeComp = ComponentType<{ status: string }>;

type Ticket = {
  id: string;
  name: string;
  description: string;
  agent: { name: string };
  status: string;
};

type Props = {
  ticket: Ticket;
  Avatar: AvatarComp;
  Badge: BadgeComp;
};

export const TicketCards: FC<Props> = ({ ticket, Avatar, Badge }) => {
  return (
    // <Link to={`/tickets/${ticket.id}`} className="ticket-link">
    <article className="ticket-card">
      <div className="ticket-card-header">
        <div className="ticket-card-agent">
          <Avatar name={ticket.agent.name} />
          <div>
            <h3 className="ticket-name">{ticket.name}</h3>
            <p className="ticket-agent">{ticket.agent.name}</p>
          </div>
        </div>
        <Badge status={ticket.status} />
      </div>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-footer">
        <span>#{ticket.id}</span>
        <span className="ticket-details-hint">Open details →</span>
      </div>
    </article>
    // </Link>
  );
};

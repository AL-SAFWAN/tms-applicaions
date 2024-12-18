from sqlmodel import Session

from app.core.models import User, Ticket, RoleEnum

from app.modules.tickets.infrastructure.repository import get_ticket_by_id, update_ticket
from app.modules.tickets.domain.models import TicketUpdate
from app.modules.user.infrastructure.repository import get_user_by_id
from app.core.models import StatusEnum


def assign_agent_to_ticket(
    session: Session, ticket: Ticket, ticket_in: TicketUpdate
) -> Ticket:
    user = get_user_by_id(session=session, id=ticket_in.assigned_agent_id)
    if user is None:
        raise ValueError("Agent does not exist")
    if user.role == RoleEnum.requester:
        raise ValueError("Only agents or admin can be assigned to tickets")
    ticket_in.assigned_agent_id = user.id
    return update_ticket(session, ticket, ticket_in)


def mark_ticket_as_resolved(
    session: Session, ticket: Ticket, ticket_in: TicketUpdate
) -> Ticket:
    from datetime import datetime, timezone

    ticket_in.resolved_at = datetime.now(timezone.utc)
    return update_ticket(session, ticket, ticket_in)


def requester_update(
    session: Session, ticket: Ticket, ticket_in: TicketUpdate, current_user: User
) -> Ticket:
    if ticket.requester_id != current_user.id:
        raise PermissionError("You can only update tickets that you requested")

    # Prevent agent assignment by the requester
    if ticket_in.assigned_agent_id is not None:
        raise PermissionError("Only agents or admins can assign agents to tickets")

    # Prevent status changes by the requester
    if ticket_in.status is not None and ticket_in.status != ticket.status:
        raise PermissionError("Only agents or admins can resolve tickets")

    # Priority changes are only allowed if the ticket is still open
    if ticket_in.priority is not None and ticket.status != StatusEnum.open:
        raise ValueError("Priority can only be changed if the ticket is open")
    return update_ticket(session, ticket, ticket_in)


def update_ticket_fields(
    session: Session, ticket_id: int, ticket_in: TicketUpdate, current_user: User
) -> Ticket:
    ticket = get_ticket_by_id(session, ticket_id)
    if not ticket:
        raise ValueError("Ticket does not exist")

    # Check ticket status and priority
    if current_user.role == "requester":
        return requester_update(session, ticket, ticket_in, current_user)
    else:
        if ticket_in.status == StatusEnum.resolved:
            return mark_ticket_as_resolved(session, ticket, ticket_in)
        if ticket_in.assigned_agent_id is not None:
            return assign_agent_to_ticket(session, ticket, ticket_in)
        else:
            return update_ticket(session, ticket, ticket_in)

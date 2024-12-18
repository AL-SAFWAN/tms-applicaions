from typing import List

# from uuid import UUID
from fastapi import APIRouter, Path, Query, HTTPException

from app.modules.deps import SessionDep, CurrentUser

from app.modules.tickets.domain.models import (
    TicketCreate,
    TicketUpdate,
    TicketPublic,
    CommentCreate,
    CommentPublic,
    CommentUpdate,
)
from app.core.models import StatusEnum, PriorityEnum, RoleEnum, Message

from app.modules.tickets.infrastructure import repository
from app.modules.tickets.domain import services


router = APIRouter()


@router.get("/", response_model=List[TicketPublic])
def list_tickets(
    session: SessionDep,
    current_user: CurrentUser,
    status: StatusEnum | None = Query(None, description="Filter by ticket status"),
    priority: PriorityEnum | None = Query(None, description="Filter by ticket status"),
    assigned: bool = Query(
        False, description="Filter tickets assigned to current agent"
    ),
) -> List[TicketPublic]:
    """
    List tickets.
    - Requesters: List only their own tickets.
    - Agents: List all tickets and assigned.
    - Admin: List all tickets.
    """
    if current_user.role == RoleEnum.requester:
        tickets_db = repository.list_tickets(
            session, requester_id=current_user.id, status=status, priority=priority
        )
    elif current_user.role == RoleEnum.agent:
        if assigned:
            tickets_db = repository.list_tickets(
                session,
                assigned_agent_id=current_user.id,
                status=status,
                priority=priority,
            )
        else:
            tickets_db = repository.list_tickets(
                session, status=status, priority=priority
            )
    else:
        tickets_db = repository.list_tickets(session, status=status, priority=priority)
    return tickets_db


@router.get("/{ticket_id}", response_model=TicketPublic)
def get_ticket(
    session: SessionDep,
    current_user: CurrentUser,
    ticket_id: int = Path(..., description="The ID of the ticket"),
) -> TicketPublic:
    """
    Get a single ticket by ID.
    - Requesters: Can view their own tickets only.
    - Agents: Can view all tickets.
    - Admin: Can view all tickets.
    """
    ticket = repository.get_ticket_by_id(session, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    if (
        current_user.role == RoleEnum.requester
        and ticket.requester_id != current_user.id
    ):
        raise HTTPException(status_code=403, detail="Not allowed to view this ticket")

    return ticket


@router.post("/", response_model=TicketPublic, status_code=201)
def create_ticket(
    session: SessionDep,
    current_user: CurrentUser,
    ticket_in: TicketCreate,
) -> TicketPublic:
    """
    Create a new ticket.
    """
    ticket = repository.create_ticket(session, ticket_in, requester_id=current_user.id)
    return ticket


@router.patch("/{ticket_id}", response_model=TicketPublic)
def update_ticket(
    session: SessionDep,
    current_user: CurrentUser,
    ticket_id: int,
    ticket_in: TicketUpdate,
) -> TicketPublic:
    """
    Update a ticket.
    - Requesters: Can update only their own tickets (title, description, priority).
    - Agents: Can update all tickets..
    - Admin: Can update all tickets.
    """
    try:
        updated_ticket = services.update_ticket_fields(
            session, ticket_id, ticket_in, current_user
        )
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return updated_ticket


@router.delete("/{ticket_id}", response_model=None, status_code=204)
def delete_ticket(ticket_id: int, session: SessionDep, current_user: CurrentUser):
    """
    Delete a ticket.
    - Only Admin can delete tickets.
    """
    if current_user.role != RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Not allowed to delete tickets")

    ticket = repository.get_ticket_by_id(session, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    repository.delete_ticket(session, ticket)
    return Message(detail="Ticket deleted successfully")


@router.post("/{ticket_id}/comments", response_model=CommentPublic, status_code=201)
def create_comment(
    session: SessionDep,
    current_user: CurrentUser,
    ticket_id: int,
    comment_in: CommentCreate,
):
    """
    Create a comment on a given ticket.
    """
    ticket = repository.get_ticket_by_id(session, ticket_id)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    comment = repository.create_comment(session, ticket_id, current_user.id, comment_in)
    return comment


@router.get("/{ticket_id}/comments", response_model=List[CommentPublic])
def list_comments(
    session: SessionDep,
    current_user: CurrentUser,
    ticket_id: int,
):
    """
    List all comments for a given ticket.
    - Requesters can view comments if they own the ticket.
    - Agents/admins can view comments of all tickets.
    """
    ticket = repository.get_ticket_by_id(session, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    if (
        current_user.role == RoleEnum.requester
        and ticket.requester_id != current_user.id
    ):
        raise HTTPException(status_code=403, detail="Not allowed to view these comments")

    comments = repository.list_comments_for_ticket(session, ticket_id)
    return comments


@router.patch("/comments/{comment_id}", response_model=CommentPublic)
def update_comment(
    session: SessionDep,
    current_user: CurrentUser,
    comment_id: int,
    comment_in: CommentUpdate,
):
    """
    Update an existing comment.
    -  Only the comment author or an admin can edit the comment.
    """
    comment = repository.get_comment_by_id(session, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.author_id != current_user.id and current_user.role != RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Not allowed to edit this comment")

    comment = repository.update_comment(session, comment, comment_in)
    return comment


@router.delete("/comments/{comment_id}", status_code=204)
def delete_comment(
    session: SessionDep,
    current_user: CurrentUser,
    comment_id: int,
):
    """
    Delete a comment.
    -  Only the comment author or an admin can delete the comment.
    """
    comment = repository.get_comment_by_id(session, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.author_id != current_user.id and current_user.role != RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Not allowed to delete this comment")

    repository.delete_comment(session, comment)
    return Message(detail="Comment deleted successfully")

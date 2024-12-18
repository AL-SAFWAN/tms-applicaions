"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Tag,
  Pencil,
} from "lucide-react";

import { StatusEnum, PriorityEnum } from "@/schemas/ticketsSchema";
import { useTicket, useUpdateTicketMutation } from "@/hooks/use-tickets";
import { useComments, useCreateCommentMutation } from "@/hooks/use-comments";

export default function TicketPage() {
  const params = useParams();
  const ticketId = Number(params.id); // ensure params.id is a number
  const {
    data: ticket,
    isLoading: ticketLoading,
    isError: ticketError,
  } = useTicket(ticketId);
  const {
    data: comments = [],
    isLoading: commentsLoading,
    isError: commentsError,
  } = useComments(ticketId);

  const [newComment, setNewComment] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const updateTicket = useUpdateTicketMutation();
  const createComment = useCreateCommentMutation();

  useEffect(() => {
    if (ticket) {
      setEditedTitle(ticket.title);
      setEditedDescription(ticket.description);
    }
  }, [ticket]);

  if (ticketLoading) return <div>Loading ticket...</div>;
  if (ticketError || !ticket) return <div>Error loading ticket.</div>;

  const handleTitleEdit = () => {
    // updateTicket.mutate(
    //   { id: ticketId, title: editedTitle },
    //   {
    //     onSuccess: () => setIsEditingTitle(false),
    //   },
    // );
  };

  const handleDescriptionEdit = () => {
    // updateTicket.mutate(
    //   { id: ticketId, description: editedDescription },
    //   {
    //     onSuccess: () => setIsEditingDescription(false),
    //   },
    // );
  };

  const handlePriorityChange = (newPriority: string) => {
    // newPriority will be one of "Low", "Medium", "High"
    // Convert it to PriorityEnum (if needed)
    const priorityEnumValue = newPriority.toLowerCase() as PriorityEnum;
    // updateTicket.mutate({ id: ticketId, priority: priorityEnumValue });
  };

  const handleAddComment = () => {
    // if (!newComment.trim()) return;
    // createComment.mutate(
    //   { content: newComment.trim() },
    //   {
    //     onSuccess: () => {
    //       setNewComment("");
    //     },
    //   },
    // );
  };

  const getStatusVariant = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.open:
        return "default";
      case StatusEnum.resolved:
      case StatusEnum.closed:
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto max-w-[1012px] py-8">
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          {isEditingTitle ? (
            <div className="flex w-full items-center space-x-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl font-semibold"
              />
              <Button onClick={handleTitleEdit}>Save</Button>
              <Button
                variant="outline"
                onClick={() => setIsEditingTitle(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-semibold">{ticket.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingTitle(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
          <Badge
            variant={getStatusVariant(ticket.status)}
            className="rounded-full"
          >
            {ticket.status === StatusEnum.open ? (
              <AlertCircle className="mr-1 h-3 w-3" />
            ) : (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            )}
            {ticket.status}
          </Badge>
          <span>#{ticket.id}</span>
          {/* {ticket.createdAt && (
            // <span>opened on {ticket.createdAt.toLocaleDateString()}</span>
          )} */}
          {ticket.requester && <span>by {ticket.requester.firstName}</span>}
        </div>
        <div className="rounded-lg bg-muted p-4">
          {isEditingDescription ? (
            <div className="space-y-2">
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex space-x-2">
                <Button onClick={handleDescriptionEdit}>Save</Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingDescription(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <p>{ticket.description}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingDescription(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-grow">
          <h2 className="mb-4 flex items-center space-x-2 text-lg font-semibold">
            <MessageSquare className="h-4 w-4" />
            <span>Comments</span>
          </h2>

          {commentsLoading && <div>Loading comments...</div>}
          {commentsError && <div>Error loading comments.</div>}
          {!commentsLoading && !commentsError && comments.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No comments yet.
            </div>
          )}

          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{comment.author.firstName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="mb-2 rounded-lg bg-muted p-4">
                  <div className="mb-2 font-semibold">
                    {comment.author.firstName} commented on{" "}
                    {comment.created_at.toLocaleDateString()}
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <Textarea
              placeholder="Leave a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 min-h-[100px]"
            />
            <Button onClick={handleAddComment}>Comment</Button>
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-semibold">Assignees</h3>
            {ticket.assigned_agent ? (
              <div className="flex items-center">
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarFallback>
                    {ticket.assigned_agent.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  {ticket.assigned_agent.firstName}
                </span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No assignee</div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-semibold">Labels</h3>
            <div className="flex flex-wrap gap-1">
              {/* Using priority as a label */}
              <Badge variant="outline" className="rounded-full">
                <Tag className="mr-1 h-3 w-3" />
                {ticket.priority}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Priority</h3>
            <Select
              onValueChange={handlePriorityChange}
              defaultValue={
                ticket.priority.charAt(0).toUpperCase() +
                ticket.priority.slice(1)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

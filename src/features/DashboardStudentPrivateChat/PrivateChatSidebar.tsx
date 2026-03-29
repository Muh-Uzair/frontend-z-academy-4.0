"use client";

import React from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Participant = {
  id: string;
  fullName: string;
  role: "student" | "instructor";
  status: "online" | "offline";
  lastMessage: string;
};

interface PrivateChatSidebarProps {
  participants: Participant[];
  searchTerm: string;
  selectedParticipantId: string;
  onSearchChange: (value: string) => void;
  onSelectParticipant: (participantId: string) => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function PrivateChatSidebar({
  participants,
  searchTerm,
  selectedParticipantId,
  onSearchChange,
  onSelectParticipant,
}: PrivateChatSidebarProps) {
  return (
    <div className="flex w-[320px] min-h-0 min-w-0 shrink-0 flex-col rounded-2xl border bg-card">
      <div className="border-b p-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students or instructor..."
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="min-w-0 space-y-2 p-3">
          {participants.map((participant) => {
            const isSelected = participant.id === selectedParticipantId;

            return (
              <button
                key={participant.id}
                type="button"
                onClick={() => onSelectParticipant(participant.id)}
                className={`grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:bg-muted/70"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={participant.fullName} />
                    <AvatarFallback>
                      {getInitials(participant.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-card ${
                      participant.status === "online"
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  />
                </div>

                <div className="min-w-0 overflow-hidden">
                  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <p className="truncate font-medium">
                      {participant.fullName}
                    </p>
                    <span className="shrink-0 text-xs capitalize text-muted-foreground">
                      {participant.role}
                    </span>
                  </div>
                  <p className="mt-1 block max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm text-muted-foreground">
                    {participant.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

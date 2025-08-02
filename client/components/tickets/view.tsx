import Ticket from "@/lib/types/ticket";
import { useState, useRef } from "react";

interface TicketViewProps {
  className?: string;
  ticket?: Ticket;
  onDismiss: () => void;
}

function BoopButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [boop, setBoop] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => setBoop(true);
  const handleMouseLeave = () => {
    setBoop(false);
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const maxOffset = 10;
    const clamp = (num: number, min: number, max: number) =>
      Math.min(Math.max(num, min), max);

    setOffset({
      x: clamp(x / 5, -maxOffset, maxOffset),
      y: clamp(y / 5, -maxOffset, maxOffset),
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative px-4 py-2 font-semibold rounded bg-indigo-600 text-white
        transform transition-transform duration-150
        ${boop ? "animate-boop" : ""}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${
          boop ? 1.1 : 1
        })`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes boop {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(10deg);
          }
        }
        .animate-boop {
          animation: boop 0.3s ease-in-out forwards;
        }
      `}</style>
    </button>
  );
}

export default function TicketView({
  className = "",
  ticket,
  onDismiss,
}: TicketViewProps) {
  if (!ticket) {
    return (
      <div className={`${className} text-center py-8 text-gray-500`}>
        Loading ticket details...
      </div>
    );
  }

  const createdOn = new Date(ticket.createdOn).toDateString();
  const updatedAt = new Date(ticket.updatedAt).toDateString();

  const priorityStyle = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const priorityPulse = {
    High: "pulse-high",
    Medium: "pulse-medium",
    Low: "pulse-low",
  };

  const priorityMap: Record<number, keyof typeof priorityStyle> = {
    1: "High",
    2: "Medium",
    3: "Low",
    4: "Medium",
    5: "Low",
  };

  const priorityKey = priorityMap[ticket.priority] || undefined;

  return (
    <>
      <div
        className={`${className} max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200 floating-card rainbow-border`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Ticket #{ticket.id}
          </h2>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              priorityKey
                ? `${priorityStyle[priorityKey]} ${priorityPulse[priorityKey]}`
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {priorityKey || "Unknown"}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">{ticket.title}</h3>
          <p className="text-gray-600 mt-2">{ticket.description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p>
              <span className="font-semibold">Category:</span> {ticket.category}
            </p>
            <p>
              <span className="font-semibold">Site:</span> {ticket.site}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Assigned to:</span>{" "}
              {ticket.assignedTo || (
                <span className="italic text-gray-400">Unassigned</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Created by:</span>{" "}
              {ticket.createdBy}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-500 pt-2">
          <p>Created on: {createdOn}</p>
          <p>Last modified: {updatedAt}</p>
        </div>

        {/* Action */}
        <div className="pt-4 text-right">
          <BoopButton onClick={onDismiss}>Close</BoopButton>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: translateY(-5px);
            box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15);
          }
        }

        @keyframes rainbow-border {
          0% {
            border-image-source: linear-gradient(
              90deg,
              red,
              orange,
              yellow,
              green,
              blue,
              indigo,
              violet
            );
          }
          100% {
            border-image-source: linear-gradient(
              450deg,
              red,
              orange,
              yellow,
              green,
              blue,
              indigo,
              violet
            );
          }
        }

        @keyframes pulse-red {
          0%,
          100% {
            background-color: #fee2e2;
          }
          50% {
            background-color: #fca5a5;
          }
        }

        @keyframes pulse-yellow {
          0%,
          100% {
            background-color: #fef3c7;
          }
          50% {
            background-color: #fde68a;
          }
        }

        @keyframes pulse-green {
          0%,
          100% {
            background-color: #d1fae5;
          }
          50% {
            background-color: #6ee7b7;
          }
        }

        .floating-card {
          animation: float 4s ease-in-out infinite;
        }

        .rainbow-border {
          border-width: 4px;
          border-style: solid;
          border-image-slice: 1;
          animation: rainbow-border 5s linear infinite;
        }

        .pulse-high {
          animation: pulse-red 3s ease-in-out infinite;
        }

        .pulse-medium {
          animation: pulse-yellow 3s ease-in-out infinite;
        }

        .pulse-low {
          animation: pulse-green 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  Building,
  Check,
  ChevronsUp,
  LetterTextIcon,
  Tag,
  Text,
  User,
} from "lucide-react";

import { useCreateTicketQuery } from "@/lib/hooks/queries/tickets";
import Ticket, {
  categories,
  Priority,
  sites,
  priorities,
  statuses,
  Status,
  Site,
  Category,
} from "@/lib/types/ticket";
import Button from "../ui/button";
import FormTextInput from "../ui/form-text-input";
import FormSelectInput from "../ui/form-select-input";

interface CreateTicketFormProps {
  onDismiss: (ticket?: Ticket) => void;
}

type FormInputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export default function CreateTicketForm({ onDismiss }: CreateTicketFormProps) {
  const { mutate: createTicket } = useCreateTicketQuery();
  const [saving, setSaving] = useState(false);

  const [ticketStatus, setTicketStatus] = useState<Status>("Open");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketAssignedTo, setTicketAssignedTo] = useState("");
  const [ticketPriority, setTicketPriority] = useState<Priority>(5);
  const [ticketSite, setTicketSite] = useState<Site>("Watsonville");
  const [ticketCategory, setTicketCategory] = useState<Category>("Software");

  const handleFormChanged = (event: ChangeEvent<FormInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "Status":
        setTicketStatus(value as Status);
        break;
      case "Title":
        setTicketTitle(value);
        break;
      case "Description":
        setTicketDescription(value);
        break;
      case "Assigned To":
        setTicketAssignedTo(value);
        break;
      case "Priority":
        setTicketPriority(parseInt(value) as Priority);
        break;
      case "Site":
        setTicketSite(value as Site);
        break;
      case "Category":
        setTicketCategory(value as Category);
        break;
    }
  };

  const handleFormDismiss = () => onDismiss();
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const form: Partial<Ticket> = {
      title: ticketTitle,
      description: ticketDescription,
      site: ticketSite,
      category: ticketCategory,
      assignedTo: ticketAssignedTo,
      createdBy: "techsquad@digitalnest.org",
      priority: ticketPriority,
      status: ticketStatus,
    };

    try {
      createTicket(form, {
        onSuccess: (ticket) => onDismiss(ticket),
        onError: (err) => console.error("Error creating ticket:", err),
        onSettled: () => setSaving(false),
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 p-3 text-sm">
      <h2 className="text-lg font-bold mb-2">Create Ticket</h2>
      <form onSubmit={handleFormSubmit}>
        <FormTextInput
          className="mb-2"
          icon={<LetterTextIcon width={16} />}
          label="Title"
          value={ticketTitle}
          onChange={handleFormChanged}
          placeholder="Enter a titile"
          required
        />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <FormSelectInput
            className="mb-2"
            icon={<Check width={16} />}
            label="Status"
            value={ticketStatus}
            options={statuses}
            onChange={handleFormChanged}
          />

          <FormSelectInput
            className="mb-2"
            icon={<ChevronsUp width={16} />}
            label="Priority"
            value={ticketPriority}
            options={priorities}
            onChange={handleFormChanged}
          />
        </div>

        <FormTextInput
          className="mb-2"
          icon={<Text width={16} height={16} />}
          label="Description"
          value={ticketDescription}
          rows={3}
          onChange={handleFormChanged}
          placeholder="Ticket Description"
          required
        />

        <div className="grid-cols-2 gap-2 mb-2">
          <FormTextInput
            icon={<User width={16} />}
            label="Assigned To"
            value={ticketAssignedTo}
            onChange={handleFormChanged}
            placeholder="Unassigned"
          />
          <FormSelectInput
            icon={<Building width={16} />}
            label="Site"
            value={ticketSite}
            options={sites}
            onChange={handleFormChanged}
          />
          <FormSelectInput
            icon={<Tag width={16} />}
            label="Category"
            value={ticketCategory}
            options={categories}
            onChange={handleFormChanged}
          />
        </div>

        {/* Your form code here */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            role="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-500 rounded"
            onClick={handleFormDismiss}
          >
            Cancel
          </Button>
          <Button
            role="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded"
            disabled={saving}
          >
            {saving ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}

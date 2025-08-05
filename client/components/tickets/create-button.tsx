import { useState } from "react";
import Modal from "../ui/modal";
import CreateTicketForm from "./create-form";

interface CreateTicketButtonProps {
  className?: string;
}

export default function CreateTicketButton({
  className = "",
}: CreateTicketButtonProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => setActive(true);
  const handleDismiss = () => setActive(false);

  return (
    <>
      <button className={className} onClick={handleClick}>
        Create New
      </button>
      <Modal active={active}>
        <CreateTicketForm onDismiss={handleDismiss} />
      </Modal>
    </>
  );
}

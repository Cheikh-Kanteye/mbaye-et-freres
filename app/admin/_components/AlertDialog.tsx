import React from "react";
import AlertMessage from "./AlertMessage";

interface AlertDialogProps {
  isDialogOpen: boolean;
  alertMessage: string | null;
  alertType: "success" | "error";
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isDialogOpen,
  alertMessage,
  alertType,
  onClose,
}) =>
  isDialogOpen && (
    <AlertMessage
      open={isDialogOpen}
      onClose={onClose}
      message={alertMessage || "Une erreur est survenue"}
      type={alertType}
    />
  );

export default AlertDialog;

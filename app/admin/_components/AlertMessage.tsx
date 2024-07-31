import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertMessageProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error";
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  open,
  onClose,
  message,
  type = "success",
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "success" ? "Succès" : "Erreur"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <p
          className={
            type === "success"
              ? "text-success text-sm"
              : "text-destructive text-sm"
          }
        >
          {message}
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={onClose}
            >
              Fermer
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertMessage;

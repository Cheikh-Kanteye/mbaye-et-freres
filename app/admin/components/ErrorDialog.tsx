import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  onClose,
  errorMessage,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Alert</AlertDialogTitle>
        </AlertDialogHeader>
        <p className="text-destructive text-sm">{errorMessage}</p>
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

export default ErrorDialog;

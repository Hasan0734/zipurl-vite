
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
} from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";


interface PropsType {
    isPending: boolean
    onConfirm: () => void;
    triggerBtn: React.ReactNode
}

const ConfirmDialog = ({isPending, onConfirm, triggerBtn}: PropsType) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerBtn}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background emerald-glow">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-transparent">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            variant={"destructive"}
            disabled={isPending}
          >
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;

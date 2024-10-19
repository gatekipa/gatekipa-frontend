import { updateReceptionVisitors } from "@/app/features/company/slice";
import { markVisitCheckoutThunk } from "@/app/features/company/thunk";
import { useAppDispatch } from "@/app/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type ReceptionVisitorCheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  visitId: string;
};

const ReceptionVisitorCheckoutModal: React.FC<
  ReceptionVisitorCheckoutModalProps
> = ({ isOpen, onClose, visitId }) => {
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(markVisitCheckoutThunk({ visitId, comments })).unwrap();
      dispatch(updateReceptionVisitors({ id: visitId }));
      toast.success(`Employee Successfully Checked Out`);
      onClose();
    } catch (error) {
      toast.error(`${error}`);
    }
  }, [visitId, comments]);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your Check Out</AlertDialogTitle>
          <div className="space-y-2">
            <Label>Comments</Label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value!)}
              placeholder="Please write your comments here"
            ></Textarea>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs px-3">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-xs px-3" onClick={handleSubmit}>
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReceptionVisitorCheckoutModal;

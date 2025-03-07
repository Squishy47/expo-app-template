import { Button } from "../components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { useDeleteDialog } from "../hooks/useDeleteDialog";

export function DeleteDialog() {
  const { isOpen, onClose, deleteFn } = useDeleteDialog();

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Deleting this event will not only delete the event but also all
            people and tasks associated with it.
            <br />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start flex flex-grow">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-1/2">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="w-1/2"
              onClick={() => deleteFn()}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

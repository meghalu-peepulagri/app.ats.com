import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Dialog,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";

interface AddRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (role: string) => void;
  loading?: boolean;
  message?: string;
}

export const AddRoleDialog: React.FC<AddRoleDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  loading,
  message
}) => {
  const [newRole, setNewRole] = useState("");

  const capitalizeWords = (value: string) => {
    return value.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const handleSave = () => {
    if (!newRole.trim()) return;
    onSave(newRole);
    setNewRole("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setNewRole("");
    }
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Position</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Enter new position"
            value={newRole}
            onChange={(e) => {
              const nativeEvent = e.nativeEvent as InputEvent;
              if (nativeEvent.inputType === 'deleteContentBackward') {
                setNewRole(e.target.value.trimStart());
              } else {
                setNewRole(capitalizeWords(e.target.value.trimStart()));
              }
            }}
            disabled={loading}
          />

          {message && <p className="text-sm text-red-500">{message}</p>}
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading} className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={!newRole.trim() || loading}
            className="bg-[#05A155] hover:bg-[#05A155] text-white cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

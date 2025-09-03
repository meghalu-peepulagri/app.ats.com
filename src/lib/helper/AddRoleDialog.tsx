import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";

interface AddRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (role: string) => void;
  loading?: boolean;
}

export const AddRoleDialog: React.FC<AddRoleDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  loading,
}) => {
  const [newRole, setNewRole] = useState("");

  const capitalizeWords = (value: string) => {
    const hasTrailingSpace = value.endsWith(" ");
    let words = value
      .split(" ")
      .map((word) =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
      )
      .join(" ");

    return hasTrailingSpace ? words + " " : words;
  };

  const handleSave = () => {
    if (!newRole.trim()) return;
    onSave(newRole);
    setNewRole("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Enter new role"
            value={newRole}
            onChange={(e) => setNewRole(capitalizeWords(e.target.value))}
            disabled={loading}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
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

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Check, ListFilter } from "lucide-react";
import { useParams } from "@tanstack/react-router";

interface FilterMenuProps {
  roleList: { id: string | number; name: string }[];
  statusList: { id: string | number; name: string }[];
  onFilterChange: (filters: { status: string; role: string }) => void;
  selectedRole?: string;
  selectedStatus?: string;
}

export default function FilterMenu({ roleList, statusList, onFilterChange, selectedRole, selectedStatus }: FilterMenuProps) {
  const [localStatus, setLocalStatus] = useState<string>(selectedStatus ?? "");
  const [localRole, setLocalRole] = useState<string>(selectedRole ?? "");

  useEffect(() => {
    setLocalStatus(selectedStatus ?? "");
    setLocalRole(selectedRole ?? "");
  }, [selectedStatus, selectedRole]);

  const handleStatusChange = (value: string) => {
    const newStatus = value === "All" ? "" : value;
    setLocalStatus(newStatus);
    onFilterChange({ status: newStatus, role: localRole });
  };

  const handleRoleChange = (value: string) => {
    const newRole = value === "All" ? "" : value;
    setLocalRole(newRole);
    onFilterChange({ status: localStatus, role: newRole });
  };

  const selectedCount = [localRole, localStatus].filter(Boolean).length;

  const handleClear = () => {
    setLocalStatus("");
    setLocalRole("");
    onFilterChange({ status: "", role: "" });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:ring-0 focus-visible:ring-0 rounded h-7">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-[rgba(0,0,0,0.08)] relative"
        >
          <ListFilter className="h-4 w-4" /> 
          <span className="text-neutral-500">Filter</span>
          {selectedCount > 0 && (
            <span className="text-[10px] rounded-full bg-red-600 text-white h-4 w-4 absolute -top-3 -right-1 flex items-center justify-center">
              {selectedCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuSub>
            <DropdownMenuItem onClick={handleClear} className="text-neutral-500 px-2 py-0 flex items-center justify-end w-fit cursor-pointer ml-auto text-xs">Clear</DropdownMenuItem>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-50 h-50 overflow-auto">
            <DropdownMenuItem
              onClick={() => handleStatusChange("All")}
              className={selectedStatus === "" ? "bg-muted" : ""}
            >
              All
              {selectedStatus === "" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            {statusList.map((status) => (
              <DropdownMenuItem
                key={status.id}
                onClick={() => handleStatusChange(String(status.id))}
                className={localStatus === String(status.id) ? "bg-muted" : ""}
              >
                {status.name}
                {localStatus === String(status.id) && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Position</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-50 h-50 overflow-auto">
          <DropdownMenuItem
              onClick={() => handleRoleChange("All")}
              className={localRole === "" ? "bg-muted" : ""}
            >
              All
              {localRole === "" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            {roleList.map((role) => (
              <DropdownMenuItem
                key={role.id}
                onClick={() => handleRoleChange(String(role.id))}
                className={localRole === String(role.id) ? "bg-muted" : ""}
              >
                {role.name}
                {localRole === String(role.id) && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

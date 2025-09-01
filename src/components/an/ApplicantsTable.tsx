import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ListFilter, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AddUploadIcon } from "../icons/AddIcon";
import { TanstackTable } from "../core/table/TanstackTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { getStatusColor } from "~/lib/helper/getColorStatus";
import { ApiApplicant } from "~/lib/interface/applicants";

export interface Candidate {
  id: number;
  avatar: string; 
  name: string; 
  position: string; 
  status: string | null;
}

interface CandidateTableProps {
  candidatesData?: Candidate[];
  rawResponse?: {
    applicants: ApiApplicant[];
    pagination?: any;
    total?: number;
  };
  isLoading?: boolean;
  onRowClick?: (Candidate : Candidate) => void
  onDeleteCandidate?: (id: number) => void
}

const columnHelper = createColumnHelper<Candidate>();

const ActionCell = ({ candidate, onDelete }: { candidate: Candidate, onDelete?: (id: number) => void }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click when clicking delete
    setIsDeleting(true);
    try {
      await onDelete?.(candidate.id);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-red-50 cursor-pointer"
                  disabled={candidate.status !== 'REJECTED' || isDeleting}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 
                    className={`text-red-500 ${isDeleting ? 'animate-spin' : ''}`} 
                    strokeWidth={1.5}
                  />
                </Button>
              </TooltipTrigger>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Candidate</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{candidate.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <TooltipContent>
            <p className="text-lg-t 2xl:text-xs 3xl:!text-sm">Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const columns = (onDeleteCandidate?: (id: number) => void): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor("avatar", {
    header: () => <span>Candidate</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={row.original.avatar} alt={`${row.original.name}'s avatar`} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.original.name}</span>
      </div>
    ),
    enableSorting: false,
    size: 150,
  }),
  columnHelper.accessor("position", {
    header: () => <span>Position</span>,
    cell: ({ row }) => <span className="text-sm">{row.original.position}</span>,
    enableSorting: true,
    size: 200,
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor = getStatusColor(status);
      return (
        <span
          className={`px-3 py-0.5 rounded-full text-[13px] 3xl:!text-base w-35 ${statusColor.bg} ${statusColor.text}`}
        >
       {status && status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() || "--"}
        </span>
      );
    },
    enableSorting: false,
    size: 150,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({row}) => <ActionCell candidate={row.original} onDelete={onDeleteCandidate} />,
    enableSorting: false,
    size: 20,
  }),
];

export function CandidateTable({
  candidatesData,
  onDeleteCandidate,
  }: CandidateTableProps) {
  const search: { search_string?: string; role?: string } = useSearch({ from: "/_header/_applicants" });
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(search.search_string ?? "");
  const [selectedRole, setSelectedRole] = useState(search.role ?? "");
  
  useEffect(() => {
    const handler = setTimeout(() => {
      navigate({
        to: "/applicants",
        search: {
          ...(searchValue ? { search_string: searchValue } : {}),
          ...(selectedRole ? { role: selectedRole } : {}),
        },
      });
    }, 500);
  
    return () => clearTimeout(handler);
  }, [searchValue, selectedRole, navigate]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleRowClick = (candidate: Candidate) => {
    navigate({ 
      to: `/applicants/${candidate.id}`,
      search,
    });
  };

  return (
    <div className="bg-white rounded-lg border-none">
      <div className="flex items-center justify-between px-4 py-2.75">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Select value={selectedRole} onValueChange={(value) => value === "All" ? setSelectedRole("") : setSelectedRole(value)}>
            <SelectTrigger className="!h-7 rounded gap-3 font-normal border-none text-[#4F4F4F] w-45 bg-[rgba(0,0,0,0.08)] focus:ring-0 focus-visible:ring-0">
              <div className="flex items-center gap-2">
                <ListFilter />
                <SelectValue placeholder="Select Role"/>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Product Design">Product Design</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Application Developer">Application Developer</SelectItem>
              <SelectItem value="Testing">Testing</SelectItem>
              <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
              <SelectItem value="Flutter Developer">Flutter Developer</SelectItem>
              <SelectItem value="UI Developer">UI Developer</SelectItem>
              <SelectItem value="Backend Developer">Backend Developer</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex items-center">
          <Search className="w-4.5 h-4.5 pl-1 text-gray-500"/>
          <Input
            type="search"
            placeholder="Search by name"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border rounded !h-7 text-[#4F4F4F] bg-[rgba(0,0,0,0.08)] font-normal py-1 pl-6 text-sm w-45 absolute focus:ring-0 focus-visible:ring-0 border-none"
          />
          </div>
        </div>
        <Button onClick={() => navigate({ to: "/add_user"})}
          className="flex items-center gap-2 h-7 text-white font-(--an-card-table-add-weight) bg-[#05A155] hover:bg-[#05A155] cursor-pointer rounded-sm">
          <AddUploadIcon />
          Add
        </Button>
      </div>
      <div className="overflow-auto h-[calc(100vh-220px)] rounded-sm border-none">
        <TanstackTable
          data={candidatesData}
          columns={columns(onDeleteCandidate)}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export default CandidateTable;
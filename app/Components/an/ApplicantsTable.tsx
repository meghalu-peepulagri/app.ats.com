import { ApiApplicant, PaginationInfo } from "@/app/lib/interface/applicants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge, EllipsisVerticalIcon, ListFilter, Search } from "lucide-react";
import { useState } from "react";
import { AddUploadIcon } from "../icons/AddIcon";
import { TanstackTable } from "../core/table/TanstackTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
}

const columnHelper = createColumnHelper<Candidate>();

const getStatusColor = (status: string | null) => {
  switch (status?.toUpperCase()) {
    case "SCREENING":
      return {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-300",
      };
    case "INTERVIEWED":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
      };
    case "REJECTED":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-300",
      };
    case "PENDING":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-300",
      };
    case "JOINED":
      return {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    }
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-300",
      };
  }
};

const ActionCell = () => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-blue-50"
            >
              <EllipsisVerticalIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-lg-t 2xl:text-xs 3xl:!text-sm">More Options</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const columns: ColumnDef<Candidate>[] = [
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
        <Badge
          className={`px-3 py-1 rounded-full text-sm ${statusColor.bg} ${statusColor.text}`}
        >
          {status}
        </Badge>
      );
    },
    enableSorting: false,
    size: 150,
  }),
  columnHelper.display({
    id: "actions",
    cell: () => <ActionCell />,
    enableSorting: false,
    size: 20,
  }),
];

export function CandidateTable({
  candidatesData,
  }: CandidateTableProps) {
  const [searchValue, setSearchValueLocal] = useState("");
  const [selectedRole, setSelectedRoleLocal] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (value: string) => {
    setSearchValueLocal(value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRoleLocal(value);
  };

  const handleRowClick = (candidate: Candidate) => {
    navigate({ 
      to: `/applicants/${candidate.id}`,
    });
  };

  return (
    <div className="bg-white rounded-lg border-none">
      <div className="flex items-center justify-between px-4 py-2.75">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="!h-7 rounded gap-3 font-normal text-[#4F4F4F] w-45 bg-[rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2">
                <ListFilter />
                <SelectValue placeholder="Select Role"/>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Fullstack">Fullstack</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex items-center">
          <Search className="w-4.5 h-4.5 pl-1 text-gray-500"/>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border rounded !h-7 text-[#4F4F4F] bg-[rgba(0,0,0,0.08)] font-normal py-1 pl-6 text-sm w-45 absolute"
          />
          </div>
        </div>
        <Button onClick={() => navigate({ to: "/add_user"})}
          className="flex items-center gap-2 h-7 text-white font-(--an-card-table-add-weight) bg-[#05A155] hover:bg-[#05A155] cursor-pointer rounded-sm">
          <AddUploadIcon />
          Add
        </Button>
      </div>
      <div className="overflow-auto h-[calc(100vh-200px)] rounded-sm border-none">
        <TanstackTable
          data={candidatesData}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export default CandidateTable;
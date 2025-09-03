import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ListFilter, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getStatusColor } from "~/lib/helper/getColorStatus";
import { ApiApplicant } from "~/lib/interface/applicants";
import { TanstackTable } from "../core/table/TanstackTable";
import { AddUploadIcon } from "../icons/AddIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
    records: ApiApplicant[];
    paginationInfo?: any;
    total?: number;
  };
  isLoading?: boolean;
  isPending?: boolean;
  onRowClick?: (Candidate: Candidate) => void;
  onDeleteCandidate: (id: number) => void;
  onDeleteId: (field: any) => void;
}

const columnHelper = createColumnHelper<Candidate>();

const ActionCell = ({
  candidate,
  onDeleteId,
}: {
  candidate: Candidate;
  onDelete?: (id: number) => void;
  onDeleteId: (field: any) => void;
}) => {

  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDeleteId(candidate);
  };

  return (
    <div className="flex items-center gap-2">
      <Trash2
        className={`text-red-500 w-4 h-4 hover:bg-red-50 cursor-pointer`}
        strokeWidth={1.5}
        onClick={(e) => handleDelete(e)}
      />
    </div>
  );
};

export const columns = (
  onDeleteId: (field: any) => void
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor("avatar", {
    header: () => <span className="pl-1">Name</span>,
    cell: ({ row }) => {
      const name = row.original?.name ?? "";
      return (
        <div className="flex items-center gap-2 pl-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm truncate max-w-[100px] cursor-default">
                  {name}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    enableSorting: false,
    size: 120,
  }),
  columnHelper.accessor("position", {
    header: () => <span>Position</span>,
    cell: ({ row }) => (
      <span className="text-sm text-ellipsis overflow-hidden">
        {row.original?.position}
      </span>
    ),
    enableSorting: true,
    size: 160,
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: ({ row }) => {
      const status = row.original?.status;
      const statusColor = getStatusColor(status);
      return (
        <span
          className={`px-3 py-0.5 rounded-full text-[13px] 3xl:!text-base w-35 text-ellipsis overflow-hidden ${statusColor.bg} ${statusColor.text}`}
        >
          {(status &&
            status.charAt(0).toUpperCase() + status.replace(/_/g, " ").slice(1).toLowerCase()) ||
            "--"}
        </span>
      );
    },
    enableSorting: false,
    size: 120,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row }) => (
      <ActionCell
        candidate={row.original}
        onDeleteId={onDeleteId}
      />
    ),
    enableSorting: false,
    size: 20,
  }),
];

export function CandidateTable({
  candidatesData,
  isLoading,
  onDeleteId,
}: CandidateTableProps) {
  const search: { search_string?: string; role?: string } = useSearch({
    from: "/_header/_applicants",
  });
  const navigate = useNavigate();
  const { applicant_id: id } = useParams({ strict: false });
  const [searchValue, setSearchValue] = useState(search.search_string ?? "");
  const [selectedRole, setSelectedRole] = useState(search.role ?? "");

  useEffect(() => {
    const handler = setTimeout(() => {
      navigate({
        to: id !== undefined ? `/applicants/${id}` : `/applicants`,
        search: {
          ...(searchValue ? { search_string: searchValue } : {}),
          ...(selectedRole ? { role: selectedRole } : {}),
        },
        replace: true,
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
      replace: true,
    });
  };

  return (
    <div className="bg-white rounded-lg border-none">
      <div className="flex items-center justify-between py-2 px-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Select
            value={selectedRole}
            onValueChange={(value) =>
              value === "All" ? setSelectedRole("") : setSelectedRole(value)
            }
          >
            <SelectTrigger className="!h-7 rounded gap-3 font-normal border-none text-[#4F4F4F] w-45 bg-[rgba(0,0,0,0.08)] focus:ring-0 focus-visible:ring-0 p-1">
              <div className="flex items-center gap-1">
                <ListFilter className="w-4 h-4" />
                <SelectValue placeholder="Select Role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Manufacturing Engineer">
                Manufacturing Engineer
              </SelectItem>
              <SelectItem value="IOT  & Robotics">IOT & Robotics</SelectItem>
              <SelectItem value="EV">EV</SelectItem>
              <SelectItem value="Product design">Product design</SelectItem>
              <SelectItem value="Hardware">Hardware</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex items-center">
            <Search className="w-4.5 h-4.5 pl-1 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by name"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border rounded !h-7 text-[#4F4F4F] bg-[rgba(0,0,0,0.08)] font-normal py-1 pl-6 text-sm w-45 absolute focus:ring-0 focus-visible:ring-0 border-none"
            />
          </div>
        </div>
        <Button
          onClick={() => navigate({ to: "/add_user" })}
          className="flex items-center gap-2 h-7 text-white font-(--an-card-table-add-weight) bg-[#05A155] hover:bg-[#05A155] cursor-pointer rounded-sm"
        >
          <AddUploadIcon />
          Add
        </Button>
      </div>
      <div className="overflow-auto h-[calc(100vh-180px)] rounded-sm w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm w-full px-[165px]">
            Loading Applicants...
          </div>
        ) : (
          <TanstackTable
            data={candidatesData}
            columns={columns(onDeleteId)}
            onRowClick={handleRowClick}
          />
        )}
      </div>
    </div>
  );
}

export default CandidateTable;

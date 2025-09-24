import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreVertical, Pencil, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { getListRolesAPI } from "~/http/services/users";
import { getStatusColor } from "~/lib/helper/getColorStatus";
import { TruncatedText } from "~/lib/helper/TruncatedText";
import { TanstackTable } from "../core/table/TanstackTable";
import { AddUploadIcon } from "../icons/AddIcon";
import FilterMenu from "../mainPage/FilterMenu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface Candidate {
  id: number;
  avatar: string;
  name: string;
  position: string;
  status: string | null;
  email: string;
  phone: string;
  experience: string;
  resume_key_path: string;
}

interface CandidateTableProps {
  candidatesData?: Candidate[];
  isLoading?: boolean;
  onRowClick?: (Candidate: Candidate) => void;
  onDeleteId: (field: any) => void;
  lastRowRef?: (node: HTMLTableRowElement | null) => void;
  isFetchingNextPage?: boolean;
}

const columnHelper = createColumnHelper<Candidate>();

const ActionCell = ({
  candidate,
  onDeleteId,
}: {
  candidate: Candidate;
  onDeleteId: (field: any) => void;
}) => {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteId(candidate);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({
      to: "/add_user",
      search: { id: candidate.id },
      state: {
        candidate: {
          id: candidate.id,
          role: candidate.position,
          first_name: candidate.name.split(" ")[0],
          last_name: candidate.name.split(" ").slice(1).join(" "),
          email: candidate.email,
          phone: candidate.phone,
          experience: candidate.experience,
          resume_key_path: candidate.resume_key_path,
        },
      } as any,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-25 p-1" onClick={(e) => e.stopPropagation()}>
        <button
          className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer"
          onClick={handleEdit}
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-100 cursor-pointer"
          onClick={handleDelete}
        >
          <Trash2 className="text-red-500 w-4 h-4" strokeWidth={1.5} />
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
};

export const columns = (
  onDeleteId: (field: any) => void
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor("avatar", {
    header: () => <span className="pl-1">Name</span>,
    cell: ({ row }) => <TruncatedText text={row.original?.name ?? ""} />,
    enableSorting: false,
    size: 120,
  }),
  columnHelper.accessor("position", {
    header: () => <span>Position</span>,
    cell: ({ row }) => <TruncatedText text={row.original?.position ?? ""} />,
    enableSorting: true,
    size: 140,
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: ({ row }) => {
      const status = row.original?.status;
      const statusColor = getStatusColor(status);
      return (
        <span
          className={`px-2 py-0.5 rounded-full text-[13px] text-ellipsis overflow-hidden ${statusColor.bg} ${statusColor.text}`}
        >
          {status
            ? status
                .toLowerCase()
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "--"}
        </span>
      );
    },
    enableSorting: false,
    size: 170,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row }) => (
      <ActionCell candidate={row.original} onDeleteId={onDeleteId} />
    ),
    enableSorting: false,
    size: 10,
  }),
];

export function CandidateTable({
  candidatesData,
  isLoading,
  onDeleteId,
  lastRowRef,
  isFetchingNextPage,
}: CandidateTableProps) {
  const search: { search_string?: string; role?: string; status?: string } = useSearch({
    from: "/_header/_applicants",
  });
  const navigate = useNavigate();
  const { applicant_id: id } = useParams({ strict: false });

  const [searchValue, setSearchValue] = useState(search.search_string ?? "");
  const [selectedRole, setSelectedRole] = useState(search.role);
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    setSearchValue(search.search_string ?? "");
    setSelectedRole(search.role ?? "");
    setSelectedStatus(search.status ?? "");
  }, [search.search_string, search.role, search.status]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);
  
    return () => clearTimeout(handler);
  }, [searchValue]);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    },
  });

  const roleList = roles?.data?.map((role: any) => ({
    id: role.id,
    name: role.role,
  }));

  const handleFilterChange = (filters: {status: string; role: string}) => {
    setSelectedStatus(filters.status);
    setSelectedRole(filters.role);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      navigate({
        to: id !== undefined ? `/applicants/${id}` : `/applicants`,
        search: {
          ...(debouncedValue ? { search_string: debouncedValue } : {}),
          ...(selectedRole ? { role: selectedRole } : {}),
          ...(selectedStatus ? { status: selectedStatus } : {}),
        },
        replace: true,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [debouncedValue, selectedRole, selectedStatus, navigate, id]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleRowClick = (row: any) => {
    const candidate = row.original;
    navigate({ to: `/applicants/${candidate.id}`, search, replace: true });
  };

  return (
    <div className="bg-white rounded-lg w-full">
      <div className="flex items-center justify-between p-2 pr-1">
        <div className="flex items-center gap-3 text-sm font-medium">
          <FilterMenu
            roleList={roleList ?? []}
            statusList={[
              { id: "APPLIED", name: "Applied" },
              { id: "SCREENED", name: "Screened" },
              { id: "SCHEDULE_INTERVIEW", name: "Schedule Interview" },
              { id: "INTERVIEWED", name: "Interviewed" },
              { id: "PIPELINE", name: "Pipeline" },
              { id: "REJECTED", name: "Rejected" },
              { id: "HIRED", name: "Hired" },
              { id: "JOINED", name: "Joined" },
            ]} 
            onFilterChange={handleFilterChange}
            selectedRole={selectedRole}
            selectedStatus={selectedStatus}
          />

          <div className="relative flex items-center">
            <Search className="w-4.5 h-4.5 pl-1 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by name"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border rounded !h-7 text-[#4F4F4F] bg-[rgba(0,0,0,0.08)] font-normal py-1 pl-6 text-sm w-42 absolute focus:ring-0 border-none"
            />
          </div>
        </div>
        <Button
          onClick={() => navigate({ to: "/add_user" })}
          className="flex items-center gap-1 h-7 text-white bg-[#05A155] hover:bg-[#05A155] rounded-sm cursor-pointer"
        >
          <AddUploadIcon />
          Add
        </Button>
      </div>
      <TanstackTable
        data={candidatesData ?? []}
        columns={columns(onDeleteId)}
        onRowClick={handleRowClick}
        lastRowRef={lastRowRef}
        loading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

export default CandidateTable;

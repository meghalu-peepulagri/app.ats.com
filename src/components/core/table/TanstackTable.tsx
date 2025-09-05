import { useParams } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { NoTableDataIcon } from "~/components/icons/NoTableDataIcon";
import { Skeleton } from "~/components/ui/skeleton";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
  id: string | number;
};

interface TanstackTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  loading?: boolean;
  height?: string | number;
  onRowClick?: (row: Row<T>) => void;
  lastRowRef?: (node: HTMLTableRowElement | null) => void;
  isFetchingNextPage?: boolean;
}

export const TanstackTable = <T,>({
  columns,
  data,
  loading = false,
  lastRowRef,
  onRowClick,
  isFetchingNextPage,
}: TanstackTableProps<T>) => {
  const { applicant_id } = useParams({ strict: false });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  const selectedRow = applicant_id ? parseInt(applicant_id) : null;

  return (
    <div className="pl-2 w-full overflow-auto h-[calc(100vh-180px)]">
      <table className="w-full border-none overflow-auto">
        <thead className="sticky top-0 z-30 text-left h-10 bg-[#DBFCD9] font-normal rounded-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                  className="text-[#333] text-[13px] 3xl:!text-base font-medium leading-[100%] p-1"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading && !isFetchingNextPage ? (
            Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={`skeleton-${rowIndex}`} className="border-b border-[#F1F1F1] h-10">
                {columns.map((_, colIndex) => (
                  <td key={`skeleton-cell-${colIndex}`} className="p-2">
                    <Skeleton className="h-6 w-full rounded-md" />
                  </td>
                ))}
              </tr>
            ))
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-[30%]">
                <div className="flex flex-col items-center justify-center">
                  <NoTableDataIcon />
                  <p className="text-sm 3xl:!text-base text-[#828282] font-normal">
                    No applicants found
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, idx) => {
              const isLast = idx === data.length - 1;
              return (
                <tr
                  key={row.id}
                  ref={isLast && lastRowRef ? lastRowRef : undefined}
                  className={`border-b border-[#F1F1F1] h-10 cursor-pointer ${
                    selectedRow === (row.original as any).id ? "bg-[#f4f3f3]" : ""
                  }`}
                  onClick={() => onRowClick?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="text-[#454545] text-[13px] 3xl:!text-base font-normal leading-[100%]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isFetchingNextPage && (
        <div className="text-center py-2 text-gray-500">Loading more...</div>
      )}
    </div>
  );
};

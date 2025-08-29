import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
  id: string | number
}

interface TanstackTableProps {
  columns: any;
  data: any;
  height?: string | number;
  onRowClick?: (row: any) => void;
}

export function TanstackTable({columns, data, height, onRowClick}: TanstackTableProps) {
    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  })

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row.original);
    }
  }

  return (
    <div className="px-4 w-full">
      <div className='overflow-auto' style={{height: height}}>
      <table className='w-full h-full border-none'>
        <thead className='sticky top-0 z-30 text-left h-9 bg-[#DBFCD9] font-normal !rounded-sm'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }} className='text-[#333] text-[13px] 3xl:!text-base font-medium leading-[100%] p-1'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='border-b border-[#F1F1F1] h-10 cursor-pointer' onClick={() => handleRowClick(row)}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ width: cell.column.getSize() }} className='text-[#454545] text-[13px] 3xl:!text-base font-normal leading-[100%]'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> 
      </div> 
    </div>
  )
}
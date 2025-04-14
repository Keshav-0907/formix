'use client'

import React, { useMemo, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUp, ArrowDown } from 'lucide-react'

type RawHeader = {
  id: string
  header: string
}

type RawResponse = {
  _id: string
  createdAt: string
  response: { id: string; response: string }[]
}

type Props = {
  headers: RawHeader[]
  responses: RawResponse[]
}

const FormResponses: React.FC<Props> = ({ headers, responses }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  console.log('headers', headers)
  console.log('responses', responses)

  const columns = useMemo<ColumnDef<Record<string, string>>[]>(() => {
    return [
      {
        accessorKey: 'sno',
        header: 'S. No',
        cell: info => String(Number(info.row.id) + 1), // Serial No based on row index
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(), // Format date
      },
      ...headers.map(header => ({
        accessorKey: header.id,
        header: header.header,
      })),
     
    ]
  }, [headers])  
  
  const data = useMemo<Record<string, string>[]>(() => {
    return responses.map((res, index) => {
      const flatRow: Record<string, string> = {
        sno: String(index + 1),
        createdAt: res.createdAt,
      }
      res.response.forEach(ans => {
        flatRow[ans.id] = ans.response
      })
      return flatRow
    })
  }, [responses])
  
  

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  console.log('table.getRowModel().rows', table.getRowModel().rows)

  return (
    <div className="py-6 w-full mx-auto">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border border-gray-300 bg-white text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none px-4 py-3 border-b text-left font-medium text-gray-700 hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {isSorted === 'asc' ? <ArrowUp size={14} /> : isSorted === 'desc' ? <ArrowDown size={14} /> : null}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 even:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 border-b text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No responses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FormResponses

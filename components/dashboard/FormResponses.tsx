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

  const columns = useMemo<ColumnDef<Record<string, string>>[]>(() => {
    return [
      {
        accessorKey: 'sno',
        header: 'S. No',
        cell: info => String(Number(info.row.id) + 1),
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
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

  return (
    <div className="py-6 w-full mx-auto text-white">
      <div className="overflow-x-auto rounded-lg shadow border border-[#2f2f2f]">
        <table className="min-w-full text-sm bg-[#1a1a1a]">
          <thead className="bg-[#1f1f1f] border-b border-[#2f2f2f]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none px-4 py-3 font-medium text-gray-200 hover:bg-[#2a2a2a] transition border-r border-[#2f2f2f]"
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
              <tr key={row.id} className="hover:bg-[#2a2a2a] even:bg-[#1d1d1d] border-b border-[#2f2f2f]">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-gray-300 border-r border-[#2f2f2f]">
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

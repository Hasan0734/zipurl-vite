
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Copy, Edit, Edit2, Trash } from "lucide-react"
import moment from 'moment'

export type DataLink = {
  id: number
  original_url: string
  short_url: string
  clicks: number
  created_at: string
}

export const columns: ColumnDef<DataLink>[] = [
  {
    accessorKey: "original_url",
    header: "Original URL",
    cell: ({row}) => (
        <div className="max-w-xs overflow-hidden truncate">{row.getValue('original_url')}</div>
    )
  },
  {
    accessorKey: "short_url",
    header: "Short URL",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({row}) => (
        <div>{moment(row.getValue('created_at')).format("DD MMM YYYY")}</div>
    )
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <Button variant={"outline"} size={"icon-sm"}>
          <Copy />
        </Button>
        <Button variant={"outline"} size={"icon-sm"}>
          <Edit2 />
        </Button>
        <Button variant={"destructive"} size={"icon-sm"}>
          <Trash />
        </Button>
      </div>
    ),
  },
]

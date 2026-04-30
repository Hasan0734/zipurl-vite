import ActivityHeader from "./ActivityHeader"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DataTable } from "./data-table"
import { columns, type DataLink } from "./columns"
import { useLoaderData } from "react-router"

// async function getData(): Promise<DataLink[]> {
//   return [
//     {
//       id: 1,
//       original_url: "https://github.com/google-gemini/generative-ai-js",
//       short_url: "bit.ly/3xJkL9",
//       clicks: 1240,
//       created_at: "2024-03-15T10:30:00Z",
//     },
//     {
//       id: 2,
//       original_url: "https://tailwindcss.com/docs/table-layout",
//       short_url: "bit.ly/4aLmN2",
//       clicks: 85,
//       created_at: "2024-03-18T14:20:00Z",
//     },
//     {
//       id: 3,
//       original_url: "https://react.dev/reference/react/useState",
//       short_url: "bit.ly/9zPqR4",
//       clicks: 432,
//       created_at: "2024-03-20T09:15:00Z",
//     },
//     {
//       id: 4,
//       original_url:
//         "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
//       short_url: "bit.ly/1bVcE7",
//       clicks: 12,
//       created_at: "2024-03-22T16:45:00Z",
//     },
//   ]
// }

const RecentActivity =  () => {

  const {urls} = useLoaderData()

  
  return (
    <section className="space-y-6">
      <ActivityHeader />
      <div className="glass-panel overflow-hidden rounded-xl shadow-2xl">
        <DataTable data={urls} columns={columns} />
        <div className="flex items-center justify-between px-8 py-4">
          <p className="text-on-surface-variant text-xs">
            Showing 1 to 10 of 1,284 links
          </p>
          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  )
}

export default RecentActivity

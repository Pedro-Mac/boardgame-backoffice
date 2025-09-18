import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Link } from '@tanstack/react-router'

interface PaginationProps {
  limit: number
  offset: number
  total: number
}

const Pagination = ({ limit, offset, total }: PaginationProps) => {
  const prevOffset = Math.max(0, offset - limit)
  const nextOffset = offset + limit
  const totalPages = Math.ceil(total / limit)
  const totalPagesList = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div>
      <ShadPagination>
        <PaginationContent>
          <PaginationItem>
            <Link
              from="/admin/games"
              to="/admin/games"
              search={{ limit, offset: prevOffset }}
            >
              <PaginationPrevious />
            </Link>
          </PaginationItem>
          {totalPagesList.map((page) => {
            return (
              <PaginationItem key={page}>
                <Link
                  from="."
                  to={'.'}
                  search={{ limit, offset: (page - 1) * limit }}
                >
                  {page}
                </Link>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <Link
              from="/admin/games"
              to="/admin/games"
              search={{ limit, offset: nextOffset }}
            >
              <PaginationNext />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>
    </div>
  )
}

export default Pagination

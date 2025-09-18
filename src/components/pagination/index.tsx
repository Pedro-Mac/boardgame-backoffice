import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Link } from '@tanstack/react-router'

interface PaginationProps {
  limit: number
  offset: number
}

const Pagination = ({ limit, offset }: PaginationProps) => {
  const currentPage = Math.floor(offset / limit) + 1
  const prevOffset = Math.max(0, offset - limit)
  const nextOffset = offset + limit

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
          <PaginationItem>
            <PaginationLink href="#">{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
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

import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Link } from '@tanstack/react-router'

interface DataTableDropdownProps {
  items: {
    link?: string
    title: string
    param?: {
      key: string
      value: string
    }
  }[]
}

const DataTableDropdown = ({ items }: DataTableDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100 focus-visible:shadow-none focus-visible:outline-none focus-visible: border-none"
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white shadow-md p-2 rounded"
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.title}
            className="px-2 py-1 focus:outline-none hover:bg-gray-50 rounded mb-1 cursor-pointer [&>*]:w-full"
          >
            {item.link && item.param ? (
              <Link
                to={item.link}
                params={{ [item.param.key]: item.param.value }}
              >
                {item.title}
              </Link>
            ) : (
              <span>{item.title}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DataTableDropdown

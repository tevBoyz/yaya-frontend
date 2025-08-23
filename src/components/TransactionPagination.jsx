// src/components/TransactionPagination.jsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

const TransactionPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)
      
      // Calculate start and end of visible page range
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        endPage = 3
      }
      
      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('ellipsis-start')
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end')
      }
      
      // Always include last page
      pages.push(totalPages)
    }
    
    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={handlePrevious}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          
          return (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={handleNext}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TransactionPagination
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

type Props = { currentPage: number, totalPages: number, setCurrentPage: (page: number) => void }




export function PaginationDemo1({ currentPage, totalPages, setCurrentPage }:Props) {



  // دالة لعرض 3 صفحات فقط (حالية، سابقة، لاحقة)
  const getVisiblePages = () => {
    const pages = [];

    // دائمًا نعرض الصفحة الحالية
    pages.push(currentPage);

    // إضافة الصفحة السابقة إذا كانت موجودة
    if (currentPage > 1) {
      pages.unshift(currentPage - 1);
    }

    // إضافة الصفحة التالية إذا كانت موجودة
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    // إذا كان لدينا أقل من 3 صفحات، نضيف المزيد
    if (pages.length < 3 && currentPage + 2 <= totalPages) {
      pages.push(currentPage + 2);
    }
    if (pages.length < 3 && currentPage - 2 >= 1) {
      pages.unshift(currentPage - 2);
    }

    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="bg-white p-4">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7 bg-transparent border-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7 bg-transparent border-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {visiblePages[0] > 1 && (
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-7 h-7 bg-transparent border-gray-100 cursor-default"
              disabled
            >
              <MoreHorizontal className="h-3 w-4" />
            </Button>
          </PaginationItem>
        )}

        {/* عرض الأرقام المرئية فقط */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full w-7 h-7 border-gray-100 text-xs ${page === currentPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-transparent hover:bg-gray-200'
                }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}

        {/* زر نقط الانتشار بعد الأرقام (إن وجدت) */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-7 h-7 bg-transparent border-gray-100 cursor-default"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PaginationItem>
        )}

        {/* زر الصفحة التالية */}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7 bg-transparent border-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {/* زر الانتقال لآخر صفحة */}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7 bg-transparent border-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
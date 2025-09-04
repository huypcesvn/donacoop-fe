'use client'

import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  itemName?: string; // Tên của item (mặc định là "items")
}

export default function PaginationWrapper({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onLimitChange,
  itemName = 'items',
}: PaginationWrapperProps) {
  // Chỉ hiển thị Pagination khi có từ 2 trang trở lên
  if (totalPages < 2) {
    return (
      <p className='mt-2 text-gray-500 text-sm'>
        Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems} {itemName}
      </p>
    );
  }

  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Items per page:</span>
          {onLimitChange && (
            <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
              <SelectTrigger className='w-20'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='5'>5</SelectItem>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='50'>50</SelectItem>
                <SelectItem value='100'>100</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <p className='text-sm text-gray-500'>
          Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems} {itemName}
        </p>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                className='cursor-pointer'
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}

"use client";

import Button from "./button";
import IconFirst from "./icons/first";
import IconLast from "./icons/last";
import IconLeft from "./icons/left";
import IconRight from "./icons/right";
import { Option, Select } from "./select";

interface TPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TPaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="quaternary"
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      >
        <IconFirst />
      </Button>
      <Button
        variant="quaternary"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconLeft />
      </Button>
      <div className="flex gap-2 items-center">
        Stran
        <div className="min-w-20">
          <Select
            value={`${currentPage}`}
            onChange={(e: string) => handlePageClick(Number(e))}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <Option
                key={index}
                value={`${index + 1}`}
              >{`${index + 1}`}</Option>
            ))}
          </Select>
        </div>
        od {totalPages}
      </div>
      <Button
        variant="quaternary"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconRight />
      </Button>
      <Button
        variant="quaternary"
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        <IconLast />
      </Button>
    </div>
  );
};

export default Pagination;

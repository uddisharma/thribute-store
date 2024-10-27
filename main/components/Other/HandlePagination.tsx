"use client";

import React from "react";
import ReactPaginate from "react-paginate";

interface Props {
  pageCount: number;
  onPageChange: (selected: number) => void;
  pageRangeDisplayed: number;
}

const HandlePagination: React.FC<Props> = ({
  pageCount,
  onPageChange,
  pageRangeDisplayed = 3,
}) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={2}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default HandlePagination;

import React from "react";
import { TablePaginationProps } from "../../../context/types";

const TablePagination: React.FC<TablePaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  paginate,
  colSpan,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <tr>
      <td colSpan={colSpan}>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <li
                key={number}
                className={`page-item ${number === currentPage ? "active" : ""}`}
              >
                <a
                  onClick={() => paginate(number)}
                  className="page-link"
                  style={{ cursor: "pointer" }}
                >
                  {number}
                </a>
              </li>
            )
          )}
        </ul>
      </td>
    </tr>
  );
};

export default TablePagination;

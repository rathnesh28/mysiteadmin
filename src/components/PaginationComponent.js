import React from 'react';
import styles from '../styles/PaginationComponent.module.css';

const PaginationComponent = ({
  totalItems,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      {/* Left Section: Display range */}
      <div className={styles.rangeDisplay}>
        Showing {startItem} - {endItem} of {totalItems}
      </div>

      {/* Right Section: Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &#8249;&#8249; {/* Double left arrow */}
          </button>
          <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#8249; {/* Single left arrow */}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &#8250; {/* Single right arrow */}
          </button>
          <button
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &#8250;&#8250; {/* Double right arrow */}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationComponent;

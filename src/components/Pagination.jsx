import React from 'react';
import { Button, Box } from '@mui/material';

export function Pagination({ page, totalPages, handlePageChange }) {
  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pages.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            variant={i === page ? 'contained' : 'outlined'}
          >
            {i}
          </Button>
        );
      } else if (i === page - 3 || i === page + 3) {
        pages.push(<span key={i}>...</span>);
      }
    }
    return pages;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      {renderPageNumbers()}
    </Box>
  );
}

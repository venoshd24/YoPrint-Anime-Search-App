import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

/**
 * Pagination
 * Wrapper around MUI Pagination for page navigation.
 */
interface Props {
  page: number;                                    // Current page
  count: number;                                   // Total pages
  onChange: (e: React.ChangeEvent<unknown>, v: number) => void; // Handler on page change
}

const Pagination: React.FC<Props> = ({ page, count, onChange }) => (
  <MuiPagination
    page={page}
    count={count}
    onChange={onChange}
    color="primary"
    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
  />
);

export default Pagination;
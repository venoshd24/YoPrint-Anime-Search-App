import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

/**
 * SearchBar
 * Controlled text input for users to type their search queries.
 */
interface Props {
  value: string;                            // Current input value
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Change handler
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <TextField
    fullWidth
    label="Search Anime"
    variant="outlined"
    value={value}
    onChange={onChange}
    placeholder="Type to search..."
  />
);

export default SearchBar;
import { TextField, debounce } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';
import { useState } from 'react';

export default function ProductSearch({ disabled = false }) {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();
  //Debouncing input to wait user to enter text
  const debouncedSearch = debounce((event) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      id='searchName'
      label='Search products'
      variant='outlined'
      fullWidth
      disabled={disabled}
      value={searchTerm || ''}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}

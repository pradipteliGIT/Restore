import { Box, Pagination, Typography } from '@mui/material';
import { MetaData } from '../models/pagination';

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}
export default function AppPagination({ metaData, onPageChange }: Props) {
  const { totalPages, currentPage, totalCount, pageSize } = metaData;
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      padding={1}
    >
      <Typography
        variant='h6'
        sx={{ fontSize: '14px' }}
      >
        Displaying {(currentPage - 1) * pageSize + 1}&nbsp;-&nbsp;
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}
        &nbsp;of&nbsp;{totalCount} items
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        color='secondary'
        onChange={(_e, page) => onPageChange(page)}
      />
    </Box>
  );
}

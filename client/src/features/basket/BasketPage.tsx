import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import BasketSummary from './BasketSummary';

import { currencyFormat } from '../../app/utils/utils';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const handleAddItem = (productId: number, quantity = 1) => {
    dispatch(addBasketItemAsync({ productId, quantity }));
  };

  const handleRemoveItem = (productId: number, quantity = 1, name?: string) => {
    dispatch(removeBasketItemAsync({ productId, quantity, name }));
  };

  if (!basket || basket.items.length === 0)
    return <Typography variant='h3'>Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Link to={`/catalog/${item.productId}`}>{item.name}</Link>
                </TableCell>
                <TableCell>
                  <Avatar src={item.pictureUrl} />
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{currencyFormat(item.price)}</TableCell>
                <TableCell align='center'>
                  <Box
                    display='flex'
                    alignItems='center'
                  >
                    <LoadingButton
                      loading={
                        status === 'pendingRemoveItem' + item.productId + 'rem'
                      }
                      color='error'
                      onClick={() => handleRemoveItem(item.productId, 1, 'rem')}
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={status === 'pendingAddItem' + item.productId}
                      color='error'
                      onClick={() => handleAddItem(item.productId, 1)}
                    >
                      <Add />
                    </LoadingButton>
                  </Box>
                </TableCell>
                <TableCell>
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                <TableCell>
                  <LoadingButton
                    loading={
                      status === 'pendingRemoveItem' + item.productId + 'del'
                    }
                    color='error'
                    onClick={() =>
                      handleRemoveItem(item.productId, item.quantity, 'del')
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        mt={2}
      >
        <Grid
          item
          xs={8}
        ></Grid>
        <Grid
          item
          xs={4}
          component={Paper}
        >
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            fullWidth
            size='large'
            variant='contained'
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

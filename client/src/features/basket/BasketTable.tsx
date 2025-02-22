import { Remove, Add, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { currencyFormat } from '../../app/utils/utils';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';
import { BasketItem } from '../../app/models/basket';

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}
export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const handleAddItem = (productId: number, quantity = 1) => {
    dispatch(addBasketItemAsync({ productId, quantity }));
  };

  const handleRemoveItem = (productId: number, quantity = 1, name?: string) => {
    dispatch(removeBasketItemAsync({ productId, quantity, name }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align='center'>Quantity</TableCell>
            <TableCell>Subtotal</TableCell>
            {isBasket && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
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
              <TableCell>{currencyFormat(item.price)}</TableCell>
              <TableCell align='center'>
                <Box
                  display='flex'
                  alignItems='center'
                >
                  {isBasket && (
                    <LoadingButton
                      loading={
                        status === 'pendingRemoveItem' + item.productId + 'rem'
                      }
                      color='error'
                      onClick={() => handleRemoveItem(item.productId, 1, 'rem')}
                    >
                      <Remove />
                    </LoadingButton>
                  )}
                  {item.quantity}
                  {isBasket && (
                    <LoadingButton
                      loading={status === 'pendingAddItem' + item.productId}
                      color='error'
                      onClick={() => handleAddItem(item.productId, 1)}
                    >
                      <Add />
                    </LoadingButton>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {currencyFormat(item.price * item.quantity)}
              </TableCell>
              <TableCell>
                {isBasket && (
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
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

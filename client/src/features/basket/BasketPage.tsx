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
import { useStoreContext } from '../../app/context/StoreContext';
import agent from '../../app/api/agent';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import BasketSummary from './BasketSummary';

import { currencyFormat } from '../../app/utils/utils';

export default function BasketPage() {
  const [status, setStatus] = useState({ loading: false, name: '' });
  const { basket, removeItem, setBasket } = useStoreContext();

  const handleAddItem = (productId: number, quantity = 1, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  };

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  };

  if (!basket)
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
                        status.loading && status.name === 'rem' + item.productId
                      }
                      color='error'
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          1,
                          'rem' + item.productId
                        )
                      }
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={
                        status.loading && status.name === 'add' + item.productId
                      }
                      color='error'
                      onClick={() =>
                        handleAddItem(item.productId, 1, 'add' + item.productId)
                      }
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
                      status.loading && status.name === 'del' + item.productId
                    }
                    color='error'
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        'del' + item.productId
                      )
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

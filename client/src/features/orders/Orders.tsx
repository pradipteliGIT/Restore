import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { Order } from '../../app/models/order';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { currencyFormat } from '../../app/utils/utils';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    agent.Order.list()
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading)
    return <LoadingComponent message='Please wait!! loading orders' />;
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Order No.</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Order date</TableCell>
            <TableCell align='right'>Order status</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component='th'
                  scope='row'
                >
                  #{order.id}
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(order.total)}
                </TableCell>
                <TableCell align='right'>
                  {order.orderDate.split('T')[0]}
                </TableCell>
                <TableCell align='right'>{order.orderStatus}</TableCell>
                <TableCell align='right'>
                  <Button
                    component={Link}
                    to={`/orders/${order.id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

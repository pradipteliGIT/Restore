import { Typography, Grid, Paper, Button, Box } from '@mui/material';
import BasketTable from '../basket/BasketTable';
import { useEffect, useState } from 'react';
import { Order } from '../../app/models/order';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { BasketItem } from '../../app/models/basket';
import agent from '../../app/api/agent';
import { Link, useParams } from 'react-router-dom';
import BasketSummary from '../basket/BasketSummary';

export default function OrderDetails() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      agent.Order.fetch(parseInt(id))
        .then((order) => {
          setOrder(order);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading)
    return <LoadingComponent message='Please wait!! Loading order' />;
  if (!order) return null;
  const subtotal =
    order.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) ?? 0;

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
      >
        <Typography
          variant='h6'
          gutterBottom
        >
          Order# {order?.id} - {order?.orderStatus}
        </Typography>
        <Button
          variant='contained'
          component={Link}
          to='/orders'
        >
          Go to orders
        </Button>
      </Box>

      {order && (
        <BasketTable
          items={order.orderItems as BasketItem[]}
          isBasket={false}
        />
      )}
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
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
}

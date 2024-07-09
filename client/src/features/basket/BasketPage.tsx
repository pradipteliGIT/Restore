import { Button, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import BasketSummary from './BasketSummary';

import { useAppSelector } from '../../app/store/configureStore';
import BasketTable from './BasketTable';

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket || basket.items.length === 0)
    return <Typography variant='h3'>Your basket is empty</Typography>;

  return (
    <>
      <BasketTable items={basket.items} />
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

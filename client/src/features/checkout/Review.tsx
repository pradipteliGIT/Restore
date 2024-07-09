import { Typography, Grid, Paper } from '@mui/material';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { useAppSelector } from '../../app/store/configureStore';

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography
        variant='h6'
        gutterBottom
      >
        Order summary
      </Typography>
      {basket && (
        <BasketTable
          items={basket.items}
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
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}

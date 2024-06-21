import { Product } from '../../app/models/Product';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/utils/utils';

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const handleAddToCart = () => {
    setIsLoading(true);
    agent.Basket.addItem(product.id)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold' },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
          bgcolor: 'primary.main',
        }}
        image={product.pictureUrl}
        title='green iguana'
      />
      <CardContent>
        <Typography
          gutterBottom
          color='secondary'
          variant='h5'
        >
          {currencyFormat(product.price)}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size='small'
          loading={isLoading}
          onClick={handleAddToCart}
        >
          Add to cart
        </LoadingButton>
        <Button
          size='small'
          component={Link}
          to={`/catalog/${product.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

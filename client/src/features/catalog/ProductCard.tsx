import { Product } from '../../app/models/Product';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
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
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Add to cart</Button>
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

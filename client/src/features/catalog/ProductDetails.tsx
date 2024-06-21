import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../app/models/Product';
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { currencyFormat } from '../../app/utils/utils';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { basket, setBasket, removeItem } = useStoreContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const item = basket?.items.find((item) => item.productId === product?.id);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
      agent.Catalog.details(parseInt(id))
        .then((product) => setProduct(product))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  const handleBasketQuantityUpdate = () => {
    if (!product) return;
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product.id, updatedQuantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product.id, updatedQuantity)
        .then(() => removeItem(product.id, updatedQuantity))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    }
  };

  if (loading) return <LoadingComponent message='Loading product details' />;
  if (!product) return <NotFound />;
  const { name, description, pictureUrl, price, type, brand, quantityInStock } =
    product;
  return (
    <Grid
      container
      spacing={6}
    >
      <Grid
        item
        xs={6}
      >
        <img
          src={pictureUrl}
          alt={`image of ${name}`}
          style={{ width: '100%', height: '400px' }}
        />
      </Grid>
      <Grid
        item
        xs={6}
      >
        <Typography variant='h3'>{name}</Typography>
        <Divider />
        <Typography
          variant='h6'
          color='secondary'
          marginTop={1}
        >
          {currencyFormat(price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={6}
          >
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in cart'
              fullWidth
              value={quantity}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const val = parseInt(event.target.value);
                setQuantity(val >= 0 ? val : 0);
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <LoadingButton
              variant='contained'
              color='primary'
              size='large'
              loading={submitting}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              sx={{ height: '56px' }}
              onClick={handleBasketQuantityUpdate}
            >
              {item ? 'Update quantity' : 'Add quantity'}
            </LoadingButton>
          </Grid>
        </Grid>
        <Button
          variant='outlined'
          color='primary'
          sx={{ marginTop: 1 }}
          startIcon={<ArrowBackIos />}
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </Button>
      </Grid>
    </Grid>
  );
}

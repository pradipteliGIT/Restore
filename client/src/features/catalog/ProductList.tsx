import { Button, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../app/models/Product';

type Props = {
  products: Product[];
  addProduct: () => void;
};
export default function ProductList({ products, addProduct }: Props) {
  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {products.map((product) => (
          <Grid
            item
            xs={10}
            sm={6}
            md={3}
            key={product.id}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant='outlined'
        onClick={addProduct}
      >
        Add Product
      </Button>
    </>
  );
}

import ProductCard from './ProductCard';
import { Product } from '../../app/models/Product';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductCardSkeleton';

type Props = {
  products: Product[];
};
export default function ProductList({ products }: Props) {
  const { productsLoadedState } = useAppSelector((state) => state.catalog);
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
            md={4}
            key={product.id}
          >
            {!productsLoadedState ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

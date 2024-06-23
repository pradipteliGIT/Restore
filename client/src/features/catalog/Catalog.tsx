import { useEffect } from 'react';
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productsSelectors } from './catalogSlice';

export default function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoadedState, status } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoadedState) dispatch(fetchProductsAsync());
  }, [productsLoadedState, dispatch]);

  const onAddProduct = () => {
    //add product
  };
  if (status.includes('pending'))
    return <LoadingComponent message='Loading products' />;
  return (
    <ProductList
      products={products}
      addProduct={onAddProduct}
    />
  );
}

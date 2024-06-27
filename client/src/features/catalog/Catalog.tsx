import { useEffect } from 'react';
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productsSelectors,
  setPageNumber,
  setProductParams,
} from './catalogSlice';
import { Grid, Paper } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../app/shared/RadioButtonGroup';
import CheckboxButtons from '../../app/shared/CheckboxButtons';
import AppPagination from '../../app/shared/AppPagination';

const sortOptions = [
  {
    value: 'name',
    label: 'Alphabetical',
  },
  {
    value: 'priceDesc',
    label: 'Price - Hight to low',
  },
  {
    value: 'price',
    label: 'Price - Low to high',
  },
];

export default function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const {
    productsLoadedState,
    filtersLoaded,
    status,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoadedState) dispatch(fetchProductsAsync());
  }, [productsLoadedState, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  if (!filtersLoaded) return <LoadingComponent message='Loading products' />;
  return (
    <Grid
      container
      columnSpacing={2}
    >
      <Grid
        item
        xs={3}
      >
        <Paper sx={{ mb: 2 }}>
          <ProductSearch disabled={status.includes('pending')} />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            disabled={status.includes('pending')}
            selectedValue={productParams.orderBy}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            options={brands}
            disabled={status.includes('pending')}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            options={types}
            disabled={status.includes('pending')}
            checked={productParams.types}
            onChange={(items) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={9}
      >
        <ProductList products={products} />
      </Grid>
      <Grid
        item
        xs={3}
      />
      <Grid
        item
        xs={9}
        sx={{ my: 2 }}
      >
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

import { useEffect, useState } from 'react';
import { Product } from '../../app/models/Product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list().then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  const onAddProduct = () => {
    const product: Product = {
      id: products.length + 1,
      name: 'newly added',
      description: 'test',
      price: 2000,
      pictureUrl: '/images/products/boot-core2.png',
      type: '',
      brand: '',
      quantityInStock: 10,
    };
    setProducts((prevState) => [...prevState, product]);
  };
  if (loading) return <LoadingComponent message='Loading products' />;
  return (
    <ProductList
      products={products}
      addProduct={onAddProduct}
    />
  );
}

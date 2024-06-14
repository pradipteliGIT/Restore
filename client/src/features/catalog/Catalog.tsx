import { useEffect, useState } from 'react';
import { Product } from '../../app/models/Product';
import ProductList from './ProductList';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/Products')
      .then((products) => products.json())
      .then((data: Product[]) => {
        setProducts(data);
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
  return (
    <ProductList
      products={products}
      addProduct={onAddProduct}
    />
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../app/models/Product';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ArrowBackIos } from '@mui/icons-material';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/Products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <CircularProgress />;
  if (!product) return null;
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
          ${(price / 100).toFixed(2)}
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
        <Button
          variant='outlined'
          color='primary'
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
